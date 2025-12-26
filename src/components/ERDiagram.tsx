import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

// Entity component
interface Attribute {
  name: string;
  isPK?: boolean;
  isFK?: boolean;
}

const Entity: React.FC<{
  x: number;
  y: number;
  width: number;
  name: string;
  attributes: Attribute[];
}> = ({ x, y, width, name, attributes }) => {
  const headerHeight = 40;
  const rowHeight = 28;
  const totalHeight = headerHeight + attributes.length * rowHeight;

  return (
    <g>
      {/* Entity box */}
      <rect
        x={x}
        y={y}
        width={width}
        height={totalHeight}
        fill="white"
        stroke="#1f2937"
        strokeWidth="2"
      />
      
      {/* Header */}
      <rect
        x={x}
        y={y}
        width={width}
        height={headerHeight}
        fill="#3b82f6"
        stroke="#1f2937"
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + headerHeight / 2 + 6}
        textAnchor="middle"
        fill="white"
        className="font-semibold"
      >
        {name}
      </text>

      {/* Attributes */}
      {attributes.map((attr, index) => {
        const attrY = y + headerHeight + index * rowHeight;
        let displayName = attr.name;
        let prefix = '';
        
        if (attr.isPK) {
          prefix = 'PK: ';
        } else if (attr.isFK) {
          prefix = 'FK: ';
        }

        return (
          <g key={index}>
            <line
              x1={x}
              y1={attrY}
              x2={x + width}
              y2={attrY}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={x + 10}
              y={attrY + rowHeight / 2 + 5}
              fill="#1f2937"
              className="text-sm"
              fontWeight={attr.isPK ? 'bold' : 'normal'}
              textDecoration={attr.isPK ? 'underline' : 'none'}
            >
              {prefix && (
                <tspan fontWeight="bold" fill={attr.isPK ? '#dc2626' : '#f97316'}>
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

// Crow's foot notation components
const CrowsFoot: React.FC<{ x: number; y: number; angle: number }> = ({ x, y, angle }) => {
  const length = 15;
  const spread = 20;
  
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      {/* Three lines for "many" */}
      <line x1={0} y1={0} x2={length} y2={-spread / 2} stroke="#1f2937" strokeWidth="2" />
      <line x1={0} y1={0} x2={length} y2={0} stroke="#1f2937" strokeWidth="2" />
      <line x1={0} y1={0} x2={length} y2={spread / 2} stroke="#1f2937" strokeWidth="2" />
    </g>
  );
};

const OneMark: React.FC<{ x: number; y: number; angle: number }> = ({ x, y, angle }) => {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      {/* Two perpendicular lines for "one" */}
      <line x1={0} y1={-8} x2={0} y2={8} stroke="#1f2937" strokeWidth="2" />
      <line x1={5} y1={-8} x2={5} y2={8} stroke="#1f2937" strokeWidth="2" />
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
}> = ({ x1, y1, x2, y2, startMany = false, endMany = false, label }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  const reverseAngle = angle + 180;
  
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1f2937" strokeWidth="2" />
      
      {/* Start notation */}
      {startMany ? (
        <CrowsFoot x={x1} y={y1} angle={reverseAngle} />
      ) : (
        <OneMark x={x1} y={y1} angle={reverseAngle} />
      )}
      
      {/* End notation */}
      {endMany ? (
        <CrowsFoot x={x2} y={y2} angle={angle} />
      ) : (
        <OneMark x={x2} y={y2} angle={angle} />
      )}

      {/* Label */}
      {label && (
        <text
          x={midX}
          y={midY - 5}
          textAnchor="middle"
          fill="#6b7280"
          className="text-xs"
          style={{ background: 'white' }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const ERDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'er-diagram-school-finder.svg';
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

    canvas.width = 1400;
    canvas.height = 1000;

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
            link.download = 'er-diagram-school-finder.png';
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

  // Entity definitions
  const userEntity = {
    x: 100,
    y: 100,
    width: 220,
    name: 'User',
    attributes: [
      { name: 'user_id', isPK: true },
      { name: 'name' },
      { name: 'email' },
      { name: 'password' },
      { name: 'role' },
      { name: 'date_created' }
    ]
  };

  const schoolEntity = {
    x: 700,
    y: 100,
    width: 220,
    name: 'School',
    attributes: [
      { name: 'school_id', isPK: true },
      { name: 'name' },
      { name: 'category' },
      { name: 'type' },
      { name: 'location' },
      { name: 'description' },
      { name: 'performance_score' }
    ]
  };

  const favoritesEntity = {
    x: 400,
    y: 300,
    width: 220,
    name: 'Favorites',
    attributes: [
      { name: 'favorite_id', isPK: true },
      { name: 'user_id', isFK: true },
      { name: 'school_id', isFK: true },
      { name: 'date_added' }
    ]
  };

  const schoolRegistrationEntity = {
    x: 400,
    y: 50,
    width: 240,
    name: 'SchoolRegistration',
    attributes: [
      { name: 'request_id', isPK: true },
      { name: 'school_id', isFK: true },
      { name: 'user_id', isFK: true },
      { name: 'status' },
      { name: 'date_submitted' }
    ]
  };

  const feedbackEntity = {
    x: 100,
    y: 450,
    width: 220,
    name: 'Feedback',
    attributes: [
      { name: 'feedback_id', isPK: true },
      { name: 'user_id', isFK: true },
      { name: 'message' },
      { name: 'date_sent' }
    ]
  };

  const adminActionEntity = {
    x: 700,
    y: 450,
    width: 220,
    name: 'AdminAction',
    attributes: [
      { name: 'action_id', isPK: true },
      { name: 'admin_id', isFK: true },
      { name: 'request_id', isFK: true },
      { name: 'action_type' },
      { name: 'timestamp' }
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

      <svg ref={svgRef} width="1400" height="800" className="w-full h-auto">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="1400" height="800" fill="#f9fafb" />

        {/* Relationship lines (drawn first, behind entities) */}
        
        {/* User to Favorites (1-to-many) */}
        <Relationship
          x1={userEntity.x + userEntity.width}
          y1={userEntity.y + 120}
          x2={favoritesEntity.x}
          y2={favoritesEntity.y + 60}
          startMany={false}
          endMany={true}
        />

        {/* School to Favorites (1-to-many) */}
        <Relationship
          x1={schoolEntity.x}
          y1={schoolEntity.y + 140}
          x2={favoritesEntity.x + favoritesEntity.width}
          y2={favoritesEntity.y + 60}
          startMany={false}
          endMany={true}
        />

        {/* User to SchoolRegistration (1-to-many) */}
        <Relationship
          x1={userEntity.x + userEntity.width}
          y1={userEntity.y + 60}
          x2={schoolRegistrationEntity.x}
          y2={schoolRegistrationEntity.y + 80}
          startMany={false}
          endMany={true}
        />

        {/* School to SchoolRegistration (1-to-many) */}
        <Relationship
          x1={schoolEntity.x}
          y1={schoolEntity.y + 60}
          x2={schoolRegistrationEntity.x + schoolRegistrationEntity.width}
          y2={schoolRegistrationEntity.y + 80}
          startMany={false}
          endMany={true}
        />

        {/* User to Feedback (1-to-many) */}
        <Relationship
          x1={userEntity.x + userEntity.width / 2}
          y1={userEntity.y + 208}
          x2={feedbackEntity.x + feedbackEntity.width / 2}
          y2={feedbackEntity.y}
          startMany={false}
          endMany={true}
        />

        {/* User (Admin) to AdminAction (1-to-many) */}
        <Relationship
          x1={userEntity.x + userEntity.width}
          y1={userEntity.y + 180}
          x2={adminActionEntity.x}
          y2={adminActionEntity.y + 40}
          startMany={false}
          endMany={true}
        />

        {/* SchoolRegistration to AdminAction (1-to-many) */}
        <Relationship
          x1={schoolRegistrationEntity.x + schoolRegistrationEntity.width}
          y1={schoolRegistrationEntity.y + 140}
          x2={adminActionEntity.x + adminActionEntity.width / 2}
          y2={adminActionEntity.y}
          startMany={false}
          endMany={true}
        />

        {/* Entities */}
        <Entity {...userEntity} />
        <Entity {...schoolEntity} />
        <Entity {...favoritesEntity} />
        <Entity {...schoolRegistrationEntity} />
        <Entity {...feedbackEntity} />
        <Entity {...adminActionEntity} />
      </svg>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="mb-3">Legend:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-16 h-10 border-2 border-gray-800 bg-blue-600"></div>
            <span>Entity (Table)</span>
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
            <svg width="40" height="20" viewBox="0 0 40 20">
              <line x1="0" y1="10" x2="25" y2="10" stroke="#1f2937" strokeWidth="2" />
              <line x1="25" y1="10" x2="32" y2="5" stroke="#1f2937" strokeWidth="2" />
              <line x1="25" y1="10" x2="32" y2="10" stroke="#1f2937" strokeWidth="2" />
              <line x1="25" y1="10" x2="32" y2="15" stroke="#1f2937" strokeWidth="2" />
            </svg>
            <span>Many (Crow's Foot)</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <line x1="0" y1="10" x2="25" y2="10" stroke="#1f2937" strokeWidth="2" />
              <line x1="25" y1="5" x2="25" y2="15" stroke="#1f2937" strokeWidth="2" />
              <line x1="30" y1="5" x2="30" y2="15" stroke="#1f2937" strokeWidth="2" />
            </svg>
            <span>One</span>
          </div>
        </div>
      </div>
    </div>
  );
};
