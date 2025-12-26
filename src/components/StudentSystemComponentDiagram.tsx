import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

export const StudentSystemComponentDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student-system-component-diagram.svg';
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
    canvas.height = 900;

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
            link.download = 'student-system-component-diagram.png';
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

      <div className="overflow-x-auto flex justify-center">
        <svg ref={svgRef} width="1400" height="900" className="max-w-full h-auto">
          {/* Background */}
          <rect width="1400" height="900" fill="#f9fafb" />

          {/* Title */}
          <text x="700" y="50" textAnchor="middle" className="text-xl" fill="#1f2937" fontWeight="bold" fontSize="26">
            Component Diagram - Student Information System
          </text>

          {/* System Boundary Box */}
          <rect
            x="100"
            y="100"
            width="1200"
            height="650"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
            strokeDasharray="10,5"
          />
          <text x="120" y="130" fill="#64748b" fontSize="18" fontWeight="bold">
            «system» Student Information System
          </text>

          {/* ============================================ */}
          {/* USER LOGIN COMPONENT (Top Center) */}
          {/* ============================================ */}
          <g transform="translate(550, 180)">
            {/* Component icon tabs */}
            <rect x="0" y="0" width="25" height="15" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
            <rect x="30" y="0" width="25" height="15" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
            
            {/* Main component box */}
            <rect
              x="0"
              y="20"
              width="300"
              height="160"
              fill="white"
              stroke="#2563eb"
              strokeWidth="3"
            />

            {/* Component name */}
            <text x="150" y="50" textAnchor="middle" fill="#1f2937" fontSize="18" fontWeight="bold">
              User Login Component
            </text>

            {/* Divider line */}
            <line x1="0" y1="70" x2="300" y2="70" stroke="#cbd5e1" strokeWidth="2" />

            {/* Responsibilities */}
            <text x="150" y="95" textAnchor="middle" fill="#6b7280" fontSize="14" fontWeight="bold">
              Responsibilities:
            </text>
            <text x="20" y="120" fill="#374151" fontSize="13">• Authenticate users</text>
            <text x="20" y="140" fill="#374151" fontSize="13">• Verify credentials</text>
            <text x="20" y="160" fill="#374151" fontSize="13">• Manage user sessions</text>

            {/* Provided Interface - Authentication Service (Right side) */}
            <circle cx="300" cy="90" r="8" fill="white" stroke="#10b981" strokeWidth="3" />
            <line x1="300" y1="90" x2="340" y2="90" stroke="#10b981" strokeWidth="2" />
            <text x="345" y="75" fill="#10b981" fontSize="12" fontWeight="bold">
              «interface»
            </text>
            <text x="345" y="95" fill="#10b981" fontSize="12">
              IAuthentication
            </text>
          </g>

          {/* ============================================ */}
          {/* GRADE MODIFICATION COMPONENT (Bottom Left) */}
          {/* ============================================ */}
          <g transform="translate(150, 450)">
            {/* Component icon tabs */}
            <rect x="0" y="0" width="25" height="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" />
            <rect x="30" y="0" width="25" height="15" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" />
            
            {/* Main component box */}
            <rect
              x="0"
              y="20"
              width="320"
              height="200"
              fill="white"
              stroke="#7c3aed"
              strokeWidth="3"
            />

            {/* Component name */}
            <text x="160" y="50" textAnchor="middle" fill="#1f2937" fontSize="18" fontWeight="bold">
              Grade Modification
            </text>
            <text x="160" y="70" textAnchor="middle" fill="#1f2937" fontSize="18" fontWeight="bold">
              Component
            </text>

            {/* Divider line */}
            <line x1="0" y1="85" x2="320" y2="85" stroke="#cbd5e1" strokeWidth="2" />

            {/* Responsibilities */}
            <text x="160" y="110" textAnchor="middle" fill="#6b7280" fontSize="14" fontWeight="bold">
              Responsibilities:
            </text>
            <text x="20" y="135" fill="#374151" fontSize="13">• Allow faculty to upload grades</text>
            <text x="20" y="155" fill="#374151" fontSize="13">• Validate grade entries</text>
            <text x="20" y="175" fill="#374151" fontSize="13">• Store grades in database</text>
            <text x="20" y="195" fill="#374151" fontSize="13">• Provide audit trail</text>

            {/* Required Interface - Authentication (Top) */}
            <circle cx="160" cy="0" r="8" fill="none" stroke="#10b981" strokeWidth="3" />
            <line x1="160" y1="0" x2="160" y2="-40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="175" y="-10" fill="#10b981" fontSize="11">
              requires IAuthentication
            </text>

            {/* Provided Interface - Grade Management (Right) */}
            <circle cx="320" cy="110" r="8" fill="white" stroke="#f59e0b" strokeWidth="3" />
            <line x1="320" y1="110" x2="360" y2="110" stroke="#f59e0b" strokeWidth="2" />
            <text x="365" y="95" fill="#f59e0b" fontSize="12" fontWeight="bold">
              «interface»
            </text>
            <text x="365" y="115" fill="#f59e0b" fontSize="12">
              IGradeModification
            </text>
          </g>

          {/* ============================================ */}
          {/* GRADE DISPLAY COMPONENT (Bottom Right) */}
          {/* ============================================ */}
          <g transform="translate(850, 450)">
            {/* Component icon tabs */}
            <rect x="0" y="0" width="25" height="15" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
            <rect x="30" y="0" width="25" height="15" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
            
            {/* Main component box */}
            <rect
              x="0"
              y="20"
              width="320"
              height="200"
              fill="white"
              stroke="#db2777"
              strokeWidth="3"
            />

            {/* Component name */}
            <text x="160" y="50" textAnchor="middle" fill="#1f2937" fontSize="18" fontWeight="bold">
              Grade Display
            </text>
            <text x="160" y="70" textAnchor="middle" fill="#1f2937" fontSize="18" fontWeight="bold">
              Component
            </text>

            {/* Divider line */}
            <line x1="0" y1="85" x2="320" y2="85" stroke="#cbd5e1" strokeWidth="2" />

            {/* Responsibilities */}
            <text x="160" y="110" textAnchor="middle" fill="#6b7280" fontSize="14" fontWeight="bold">
              Responsibilities:
            </text>
            <text x="20" y="135" fill="#374151" fontSize="13">• Display student grades</text>
            <text x="20" y="155" fill="#374151" fontSize="13">• Format grade information</text>
            <text x="20" y="175" fill="#374151" fontSize="13">• Render via web browser</text>
            <text x="20" y="195" fill="#374151" fontSize="13">• Calculate GPA/statistics</text>

            {/* Required Interface - Authentication (Top) */}
            <circle cx="160" cy="0" r="8" fill="none" stroke="#10b981" strokeWidth="3" />
            <line x1="160" y1="0" x2="160" y2="-40" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="175" y="-10" fill="#10b981" fontSize="11">
              requires IAuthentication
            </text>

            {/* Provided Interface - Grade View (Right) */}
            <circle cx="320" cy="110" r="8" fill="white" stroke="#06b6d4" strokeWidth="3" />
            <line x1="320" y1="110" x2="360" y2="110" stroke="#06b6d4" strokeWidth="2" />
            <text x="365" y="95" fill="#06b6d4" fontSize="12" fontWeight="bold">
              «interface»
            </text>
            <text x="365" y="115" fill="#06b6d4" fontSize="12">
              IGradeView
            </text>
          </g>

          {/* ============================================ */}
          {/* CONNECTION LINES */}
          {/* ============================================ */}
          
          {/* Login to Grade Modification (Authentication) */}
          <line x1="650" y1="340" x2="310" y2="410" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

          {/* Login to Grade Display (Authentication) */}
          <line x1="750" y1="340" x2="1010" y2="410" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

          {/* ============================================ */}
          {/* EXTERNAL ACTORS */}
          {/* ============================================ */}

          {/* Faculty Actor (Left) */}
          <g transform="translate(50, 520)">
            {/* Head */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="#1f2937" strokeWidth="2" />
            {/* Body */}
            <line x1="0" y1="20" x2="0" y2="60" stroke="#1f2937" strokeWidth="2" />
            {/* Arms */}
            <line x1="0" y1="35" x2="-25" y2="45" stroke="#1f2937" strokeWidth="2" />
            <line x1="0" y1="35" x2="25" y2="45" stroke="#1f2937" strokeWidth="2" />
            {/* Legs */}
            <line x1="0" y1="60" x2="-20" y2="90" stroke="#1f2937" strokeWidth="2" />
            <line x1="0" y1="60" x2="20" y2="90" stroke="#1f2937" strokeWidth="2" />
            {/* Label */}
            <text x="0" y="110" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">
              Faculty
            </text>
          </g>

          {/* Student Actor (Right) */}
          <g transform="translate(1330, 520)">
            {/* Head */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="#1f2937" strokeWidth="2" />
            {/* Body */}
            <line x1="0" y1="20" x2="0" y2="60" stroke="#1f2937" strokeWidth="2" />
            {/* Arms */}
            <line x1="0" y1="35" x2="-25" y2="45" stroke="#1f2937" strokeWidth="2" />
            <line x1="0" y1="35" x2="25" y2="45" stroke="#1f2937" strokeWidth="2" />
            {/* Legs */}
            <line x1="0" y1="60" x2="-20" y2="90" stroke="#1f2937" strokeWidth="2" />
            <line x1="0" y1="60" x2="20" y2="90" stroke="#1f2937" strokeWidth="2" />
            {/* Label */}
            <text x="0" y="110" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">
              Student
            </text>
          </g>

          {/* Faculty to Grade Modification connection */}
          <line x1="75" y1="560" x2="150" y2="560" stroke="#1f2937" strokeWidth="2" />
          <text x="90" y="550" fill="#1f2937" fontSize="11">uses</text>

          {/* Student to Grade Display connection */}
          <line x1="1305" y1="560" x2="1170" y2="560" stroke="#1f2937" strokeWidth="2" />
          <text x="1210" y="550" fill="#1f2937" fontSize="11">uses</text>

          {/* Web Browser icon/label */}
          <g transform="translate(1200, 580)">
            <rect x="0" y="0" width="100" height="70" fill="white" stroke="#64748b" strokeWidth="2" rx="4" />
            <rect x="0" y="0" width="100" height="15" fill="#64748b" />
            <circle cx="10" cy="7" r="3" fill="white" />
            <circle cx="20" cy="7" r="3" fill="white" />
            <circle cx="30" cy="7" r="3" fill="white" />
            <text x="50" y="45" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">
              Web
            </text>
            <text x="50" y="60" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">
              Browser
            </text>
          </g>

          {/* Arrow markers definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
          </defs>

          {/* ============================================ */}
          {/* LEGEND */}
          {/* ============================================ */}
          <g transform="translate(100, 780)">
            <text x="0" y="0" fill="#1f2937" fontSize="16" fontWeight="bold">
              Component Diagram Notation:
            </text>

            {/* Component symbol */}
            <rect x="0" y="15" width="15" height="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" />
            <rect x="20" y="15" width="15" height="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" />
            <rect x="0" y="27" width="60" height="40" fill="white" stroke="#2563eb" strokeWidth="2" />
            <text x="70" y="50" fill="#374151" fontSize="13">
              = Component (with stereotype tabs)
            </text>

            {/* Provided Interface */}
            <circle cx="250" cy="47" r="6" fill="white" stroke="#10b981" strokeWidth="2" />
            <line x1="250" y1="47" x2="280" y2="47" stroke="#10b981" strokeWidth="2" />
            <text x="290" y="52" fill="#374151" fontSize="13">
              = Provided Interface (ball notation)
            </text>

            {/* Required Interface */}
            <circle cx="620" cy="47" r="6" fill="none" stroke="#10b981" strokeWidth="2" />
            <line x1="620" y1="47" x2="650" y2="47" stroke="#10b981" strokeWidth="2" />
            <text x="660" y="52" fill="#374151" fontSize="13">
              = Required Interface (socket notation)
            </text>

            {/* Dependency */}
            <line x1="1000" y1="47" x2="1050" y2="47" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
            <text x="1060" y="52" fill="#374151" fontSize="13">
              = Dependency / Uses relationship
            </text>
          </g>
        </svg>
      </div>

      {/* Description */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Student Information System - Component Architecture:</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <p>
            <span className="font-semibold">User Login Component:</span> Provides authentication services (IAuthentication interface) 
            that both the Grade Modification and Grade Display components require. This component validates user credentials 
            and manages session state for faculty and students.
          </p>
          <p>
            <span className="font-semibold">Grade Modification Component:</span> Used by faculty members to upload and manage 
            student grades. It requires authentication to ensure only authorized faculty can modify grades. Provides the 
            IGradeModification interface for grade management operations.
          </p>
          <p>
            <span className="font-semibold">Grade Display Component:</span> Allows students to view their grades online through 
            a web browser. It requires authentication to ensure students can only view their own grades. Provides the IGradeView 
            interface for rendering grade information in a user-friendly format.
          </p>
          <p>
            <span className="font-semibold">Component Interactions:</span> The User Login Component acts as a central authentication 
            provider, with both the Grade Modification and Grade Display components depending on it for user verification. This 
            demonstrates the separation of concerns principle, where authentication logic is centralized and reused across the system.
          </p>
        </div>
      </div>
    </div>
  );
};
