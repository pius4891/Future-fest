import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

// Actor component - stick figure
const Actor: React.FC<{ x: number; y: number; label: string }> = ({ x, y, label }) => (
  <g>
    {/* Head */}
    <circle cx={x} cy={y} r="12" fill="none" stroke="#1f2937" strokeWidth="2" />
    {/* Body */}
    <line x1={x} y1={y + 12} x2={x} y2={y + 40} stroke="#1f2937" strokeWidth="2" />
    {/* Arms */}
    <line x1={x - 20} y1={y + 25} x2={x + 20} y2={y + 25} stroke="#1f2937" strokeWidth="2" />
    {/* Legs */}
    <line x1={x} y1={y + 40} x2={x - 15} y2={y + 65} stroke="#1f2937" strokeWidth="2" />
    <line x1={x} y1={y + 40} x2={x + 15} y2={y + 65} stroke="#1f2937" strokeWidth="2" />
    {/* Label */}
    <text x={x} y={y + 85} textAnchor="middle" className="text-sm" fill="#1f2937">
      {label}
    </text>
  </g>
);

// Use Case component - oval
const UseCase: React.FC<{ x: number; y: number; width: number; height: number; label: string; id: string }> = ({
  x,
  y,
  width,
  height,
  label,
  id
}) => (
  <g id={id}>
    <ellipse
      cx={x}
      cy={y}
      rx={width / 2}
      ry={height / 2}
      fill="white"
      stroke="#2563eb"
      strokeWidth="2"
    />
    <text x={x} y={y + 5} textAnchor="middle" className="text-sm" fill="#1f2937">
      {label}
    </text>
  </g>
);

// Multi-line use case for longer labels
const UseCaseMultiline: React.FC<{ x: number; y: number; width: number; height: number; lines: string[]; id: string }> = ({
  x,
  y,
  width,
  height,
  lines,
  id
}) => (
  <g id={id}>
    <ellipse
      cx={x}
      cy={y}
      rx={width / 2}
      ry={height / 2}
      fill="white"
      stroke="#2563eb"
      strokeWidth="2"
    />
    {lines.map((line, index) => (
      <text
        key={index}
        x={x}
        y={y + (index - (lines.length - 1) / 2) * 14 + 5}
        textAnchor="middle"
        className="text-sm"
        fill="#1f2937"
      >
        {line}
      </text>
    ))}
  </g>
);

// Association line
const Association: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="1.5" />
);

export const UseCaseDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'use-case-diagram-school-finder.svg';
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
    canvas.height = 750;

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
            link.download = 'use-case-diagram-school-finder.png';
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

  // Actor positions
  const actors = {
    visitor: { x: 100, y: 150 },
    registeredUser: { x: 100, y: 350 },
    schoolRep: { x: 1100, y: 200 },
    admin: { x: 1100, y: 500 }
  };

  // Use case positions (center area)
  const useCases = {
    search: { x: 400, y: 100, w: 140, h: 50, id: 'uc-search' },
    filter: { x: 400, y: 180, w: 180, h: 50, id: 'uc-filter' },
    viewDetails: { x: 400, y: 260, w: 140, h: 50, id: 'uc-view' },
    register: { x: 600, y: 100, w: 140, h: 50, id: 'uc-register' },
    login: { x: 600, y: 180, w: 100, h: 50, id: 'uc-login' },
    saveFavorites: { x: 600, y: 260, w: 140, h: 50, id: 'uc-favorites' },
    submitFeedback: { x: 600, y: 340, w: 140, h: 50, id: 'uc-feedback' },
    registerSchool: { x: 800, y: 100, w: 140, h: 50, id: 'uc-reg-school' },
    updateSchool: { x: 800, y: 180, w: 160, h: 50, id: 'uc-update-school' },
    respondQueries: { x: 800, y: 260, w: 160, h: 50, id: 'uc-respond' },
    adminVerify: { x: 800, y: 380, w: 180, h: 50, id: 'uc-verify' },
    manageUsers: { x: 800, y: 460, w: 120, h: 50, id: 'uc-manage-users' },
    manageSchools: { x: 800, y: 540, w: 160, h: 50, id: 'uc-manage-schools' },
    generateReports: { x: 800, y: 620, w: 140, h: 50, id: 'uc-reports' }
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

      <svg ref={svgRef} width="1200" height="750" className="w-full h-auto">
        {/* System boundary */}
        <rect
          x="280"
          y="40"
          width="650"
          height="660"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text x="290" y="30" className="text-sm" fill="#64748b">
          School Finder System
        </text>

        {/* Association lines - drawn first so they appear behind */}
        
        {/* Visitor associations */}
        <Association x1={120} y1={150} x2={330} y2={100} />
        <Association x1={120} y1={150} x2={320} y2={180} />
        <Association x1={120} y1={150} x2={330} y2={260} />

        {/* Registered User associations */}
        <Association x1={120} y1={350} x2={330} y2={100} />
        <Association x1={120} y1={350} x2={320} y2={180} />
        <Association x1={120} y1={350} x2={330} y2={260} />
        <Association x1={120} y1={350} x2={530} y2={100} />
        <Association x1={120} y1={350} x2={550} y2={180} />
        <Association x1={120} y1={350} x2={530} y2={260} />
        <Association x1={120} y1={350} x2={530} y2={340} />

        {/* School Representative associations */}
        <Association x1={1080} y1={200} x2={870} y2={100} />
        <Association x1={1080} y1={200} x2={880} y2={180} />
        <Association x1={1080} y1={200} x2={880} y2={260} />
        <Association x1={1080} y1={200} x2={670} y2={180} />

        {/* Administrator associations */}
        <Association x1={1080} y1={500} x2={890} y2={380} />
        <Association x1={1080} y1={500} x2={860} y2={460} />
        <Association x1={1080} y1={500} x2={880} y2={540} />
        <Association x1={1080} y1={500} x2={870} y2={620} />

        {/* Actors */}
        <Actor x={actors.visitor.x} y={actors.visitor.y} label="Visitor/User" />
        <Actor x={actors.registeredUser.x} y={actors.registeredUser.y} label="Registered User" />
        <Actor x={actors.schoolRep.x} y={actors.schoolRep.y} label="School Rep" />
        <Actor x={actors.admin.x} y={actors.admin.y} label="Administrator" />

        {/* Use Cases - Left column */}
        <UseCase
          x={useCases.search.x}
          y={useCases.search.y}
          width={useCases.search.w}
          height={useCases.search.h}
          label="Search Schools"
          id={useCases.search.id}
        />
        <UseCaseMultiline
          x={useCases.filter.x}
          y={useCases.filter.y}
          width={useCases.filter.w}
          height={useCases.filter.h}
          lines={['Filter Schools', '(type, location, etc.)']}
          id={useCases.filter.id}
        />
        <UseCase
          x={useCases.viewDetails.x}
          y={useCases.viewDetails.y}
          width={useCases.viewDetails.w}
          height={useCases.viewDetails.h}
          label="View School Details"
          id={useCases.viewDetails.id}
        />

        {/* Use Cases - Middle column */}
        <UseCase
          x={useCases.register.x}
          y={useCases.register.y}
          width={useCases.register.w}
          height={useCases.register.h}
          label="Register Account"
          id={useCases.register.id}
        />
        <UseCase
          x={useCases.login.x}
          y={useCases.login.y}
          width={useCases.login.w}
          height={useCases.login.h}
          label="Log In"
          id={useCases.login.id}
        />
        <UseCase
          x={useCases.saveFavorites.x}
          y={useCases.saveFavorites.y}
          width={useCases.saveFavorites.w}
          height={useCases.saveFavorites.h}
          label="Save Favorites"
          id={useCases.saveFavorites.id}
        />
        <UseCase
          x={useCases.submitFeedback.x}
          y={useCases.submitFeedback.y}
          width={useCases.submitFeedback.w}
          height={useCases.submitFeedback.h}
          label="Submit Feedback"
          id={useCases.submitFeedback.id}
        />

        {/* Use Cases - Right column */}
        <UseCase
          x={useCases.registerSchool.x}
          y={useCases.registerSchool.y}
          width={useCases.registerSchool.w}
          height={useCases.registerSchool.h}
          label="Register School"
          id={useCases.registerSchool.id}
        />
        <UseCaseMultiline
          x={useCases.updateSchool.x}
          y={useCases.updateSchool.y}
          width={useCases.updateSchool.w}
          height={useCases.updateSchool.h}
          lines={['Update School', 'Information']}
          id={useCases.updateSchool.id}
        />
        <UseCase
          x={useCases.respondQueries.x}
          y={useCases.respondQueries.y}
          width={useCases.respondQueries.w}
          height={useCases.respondQueries.h}
          label="Respond to Queries"
          id={useCases.respondQueries.id}
        />
        <UseCaseMultiline
          x={useCases.adminVerify.x}
          y={useCases.adminVerify.y}
          width={useCases.adminVerify.w}
          height={useCases.adminVerify.h}
          lines={['Verify School Data', '(Admin Approval)']}
          id={useCases.adminVerify.id}
        />
        <UseCase
          x={useCases.manageUsers.x}
          y={useCases.manageUsers.y}
          width={useCases.manageUsers.w}
          height={useCases.manageUsers.h}
          label="Manage Users"
          id={useCases.manageUsers.id}
        />
        <UseCaseMultiline
          x={useCases.manageSchools.x}
          y={useCases.manageSchools.y}
          width={useCases.manageSchools.w}
          height={useCases.manageSchools.h}
          lines={['Manage School', 'Data']}
          id={useCases.manageSchools.id}
        />
        <UseCase
          x={useCases.generateReports.x}
          y={useCases.generateReports.y}
          width={useCases.generateReports.w}
          height={useCases.generateReports.h}
          label="Generate Reports"
          id={useCases.generateReports.id}
        />
      </svg>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="mb-2">Legend:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-800 rounded-full"></div>
            <span>Actor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 border-2 border-blue-600 rounded-full bg-white"></div>
            <span>Use Case</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0 border-t-2 border-gray-500"></div>
            <span>Association</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0 border-t-2 border-gray-400 border-dashed"></div>
            <span>System Boundary</span>
          </div>
        </div>
      </div>
    </div>
  );
};