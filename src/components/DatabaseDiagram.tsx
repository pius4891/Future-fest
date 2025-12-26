import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

// Field interface
interface Field {
  name: string;
  isPK?: boolean;
  isFK?: boolean;
}

// Table component
const Table: React.FC<{
  x: number;
  y: number;
  width: number;
  name: string;
  fields: Field[];
}> = ({ x, y, width, name, fields }) => {
  const headerHeight = 45;
  const rowHeight = 30;
  const totalHeight = headerHeight + fields.length * rowHeight;

  return (
    <g>
      {/* Table box */}
      <rect
        x={x}
        y={y}
        width={width}
        height={totalHeight}
        fill="white"
        stroke="#1f2937"
        strokeWidth="2.5"
      />
      
      {/* Header */}
      <rect
        x={x}
        y={y}
        width={width}
        height={headerHeight}
        fill="#3b82f6"
        stroke="#1f2937"
        strokeWidth="2.5"
      />
      <text
        x={x + width / 2}
        y={y + headerHeight / 2 + 7}
        textAnchor="middle"
        fill="white"
        className="font-semibold text-base"
      >
        {name}
      </text>

      {/* Fields */}
      {fields.map((field, index) => {
        const fieldY = y + headerHeight + index * rowHeight;
        let displayName = field.name;
        let prefix = '';
        
        if (field.isPK) {
          prefix = 'PK: ';
        } else if (field.isFK) {
          prefix = 'FK: ';
        }

        return (
          <g key={index}>
            {index > 0 && (
              <line
                x1={x}
                y1={fieldY}
                x2={x + width}
                y2={fieldY}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )}
            <text
              x={x + 12}
              y={fieldY + rowHeight / 2 + 6}
              fill="#1f2937"
              className="text-sm"
              fontWeight={field.isPK ? 'bold' : 'normal'}
            >
              {prefix && (
                <tspan fontWeight="bold" fill={field.isPK ? '#dc2626' : '#f97316'}>
                  {prefix}
                </tspan>
              )}
              {displayName}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Relationship line with crow's foot notation
const Relationship: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startMany?: boolean;
  endMany?: boolean;
  label?: string;
  curved?: boolean;
}> = ({ x1, y1, x2, y2, startMany = false, endMany = false, label, curved = false }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  const reverseAngle = angle + 180;
  
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Crow's foot at end
  const CrowsFoot = ({ x, y, ang }: { x: number; y: number; ang: number }) => {
    const length = 15;
    const spread = 20;
    
    return (
      <g transform={`translate(${x},${y}) rotate(${ang})`}>
        <line x1={0} y1={0} x2={length} y2={-spread / 2} stroke="#1f2937" strokeWidth="2" />
        <line x1={0} y1={0} x2={length} y2={0} stroke="#1f2937" strokeWidth="2" />
        <line x1={0} y1={0} x2={length} y2={spread / 2} stroke="#1f2937" strokeWidth="2" />
      </g>
    );
  };

  // One mark
  const OneMark = ({ x, y, ang }: { x: number; y: number; ang: number }) => {
    return (
      <g transform={`translate(${x},${y}) rotate(${ang})`}>
        <line x1={0} y1={-8} x2={0} y2={8} stroke="#1f2937" strokeWidth="2" />
        <line x1={5} y1={-8} x2={5} y2={8} stroke="#1f2937" strokeWidth="2" />
      </g>
    );
  };

  return (
    <g>
      {curved ? (
        <path
          d={`M ${x1} ${y1} Q ${midX} ${y1} ${midX} ${midY} T ${x2} ${y2}`}
          stroke="#1f2937"
          strokeWidth="2.5"
          fill="none"
        />
      ) : (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1f2937" strokeWidth="2.5" />
      )}
      
      {/* Start notation */}
      {startMany ? (
        <CrowsFoot x={x1} y={y1} ang={reverseAngle} />
      ) : (
        <OneMark x={x1} y={y1} ang={reverseAngle} />
      )}
      
      {/* End notation */}
      {endMany ? (
        <CrowsFoot x={x2} y={y2} ang={angle} />
      ) : (
        <OneMark x={x2} y={y2} ang={angle} />
      )}

      {/* Label */}
      {label && (
        <text
          x={midX}
          y={midY - 8}
          textAnchor="middle"
          fill="#059669"
          className="text-sm"
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const DatabaseDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'database-schema-school-finder.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsPNG = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1200;
    canvas.height = 800;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'database-schema-school-finder.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Table definitions
  const usersTable = {
    x: 80,
    y: 120,
    width: 260,
    name: 'Users',
    fields: [
      { name: 'user_id', isPK: true },
      { name: 'name' },
      { name: 'email' },
      { name: 'password_hash' },
      { name: 'created_at' }
    ]
  };

  const schoolsTable = {
    x: 480,
    y: 80,
    width: 260,
    name: 'Schools',
    fields: [
      { name: 'school_id', isPK: true },
      { name: 'school_name' },
      { name: 'category' },
      { name: 'location' },
      { name: 'description' },
      { name: 'contact_info' },
      { name: 'created_at' }
    ]
  };

  const programsTable = {
    x: 860,
    y: 200,
    width: 260,
    name: 'Programs',
    fields: [
      { name: 'program_id', isPK: true },
      { name: 'school_id', isFK: true },
      { name: 'program_name' },
      { name: 'level' }
    ]
  };

  const searchLogsTable = {
    x: 80,
    y: 450,
    width: 260,
    name: 'Search_Logs',
    fields: [
      { name: 'log_id', isPK: true },
      { name: 'user_id', isFK: true },
      { name: 'search_query' },
      { name: 'filters_used' },
      { name: 'timestamp' }
    ]
  };

  const schoolFiltersTable = {
    x: 480,
    y: 450,
    width: 260,
    name: 'School_Filters',
    fields: [
      { name: 'filter_id', isPK: true },
      { name: 'filter_type' },
      { name: 'filter_value' },
      { name: 'description' }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Download buttons */}
      <div className="flex gap-3 mb-4 justify-end">
        <Button onClick={downloadAsSVG} variant="outline" className="gap-2">
          <Download className="size-4" />
          Download SVG
        </Button>
        <Button onClick={downloadAsPNG} className="gap-2">
          <Download className="size-4" />
          Download PNG
        </Button>
      </div>

      <div className="overflow-x-auto">
        <svg ref={svgRef} width="1200" height="800" className="w-full h-auto">
          {/* Background */}
          <rect width="1200" height="800" fill="#f9fafb" />

          {/* Title */}
          <text x="600" y="40" textAnchor="middle" className="text-xl" fill="#1f2937" fontWeight="bold">
            Database Schema - School Finder Application
          </text>

          {/* Relationship lines (drawn first, behind tables) */}
          
          {/* Users to Search_Logs (1-to-many) */}
          <Relationship
            x1={usersTable.x + usersTable.width / 2}
            y1={usersTable.y + 195}
            x2={searchLogsTable.x + searchLogsTable.width / 2}
            y2={searchLogsTable.y}
            startMany={false}
            endMany={true}
            label="1:N"
          />

          {/* Schools to Programs (1-to-many) */}
          <Relationship
            x1={schoolsTable.x + schoolsTable.width}
            y1={schoolsTable.y + 120}
            x2={programsTable.x}
            y2={programsTable.y + 60}
            startMany={false}
            endMany={true}
            label="1:N"
          />

          {/* Tables */}
          <Table {...usersTable} />
          <Table {...schoolsTable} />
          <Table {...programsTable} />
          <Table {...searchLogsTable} />
          <Table {...schoolFiltersTable} />

          {/* Relationship labels with descriptions */}
          <text x={usersTable.x + usersTable.width / 2} y={350} textAnchor="middle" fill="#6b7280" className="text-xs italic">
            creates
          </text>

          <text x={770} y={180} textAnchor="middle" fill="#6b7280" className="text-xs italic">
            offers
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="mb-3">Legend:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-16 h-10 border-2 border-gray-800 bg-blue-600"></div>
            <span>Database Table</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600">PK:</span>
            <span>Primary Key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600">FK:</span>
            <span>Foreign Key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">1:N</span>
            <span>One-to-Many Relationship</span>
          </div>
        </div>
      </div>

      {/* Table Descriptions */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Table Descriptions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <p><span className="font-semibold">Users:</span> Stores user account information including authentication details and profile data</p>
          </div>
          <div>
            <p><span className="font-semibold">Schools:</span> Contains comprehensive school information including location, category, and contact details</p>
          </div>
          <div>
            <p><span className="font-semibold">Programs:</span> Stores academic programs offered by each school with program level information</p>
          </div>
          <div>
            <p><span className="font-semibold">Search_Logs:</span> Tracks user search history including queries and filters used for analytics</p>
          </div>
          <div>
            <p><span className="font-semibold">School_Filters:</span> Defines available filter options for school searches (e.g., location, type, rating)</p>
          </div>
        </div>
      </div>

      {/* Relationships Description */}
      <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
        <h3 className="mb-3">Database Relationships:</h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-green-700"><span className="font-semibold">Users → Search_Logs</span> (One-to-Many)</p>
            <p className="text-gray-600 ml-4">One user can create multiple search logs. Each search log belongs to exactly one user.</p>
          </div>
          <div>
            <p className="text-green-700"><span className="font-semibold">Schools → Programs</span> (One-to-Many)</p>
            <p className="text-gray-600 ml-4">One school can offer multiple programs. Each program belongs to exactly one school.</p>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-gray-700"><span className="font-semibold">Additional Context:</span></p>
            <p className="text-gray-600 ml-4">• <span className="font-semibold">School_Filters</span> table is a reference table that doesn't have direct foreign key relationships but is used by the application to filter school searches</p>
            <p className="text-gray-600 ml-4">• The <span className="font-semibold">filters_used</span> field in Search_Logs stores which filters were applied (could reference School_Filters)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
