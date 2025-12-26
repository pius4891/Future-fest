import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

// Start/End node (filled circle)
const StartEndNode: React.FC<{ x: number; y: number; isEnd?: boolean }> = ({ x, y, isEnd = false }) => (
  <g>
    <circle cx={x} cy={y} r="20" fill="#1f2937" stroke="#1f2937" strokeWidth="3" />
    {isEnd && <circle cx={x} cy={y} r="12" fill="white" />}
  </g>
);

// Activity node (rounded rectangle)
const Activity: React.FC<{ 
  x: number; 
  y: number; 
  width: number; 
  height: number; 
  label: string;
  lines?: string[];
}> = ({ x, y, width, height, label, lines }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="25"
      ry="25"
      fill="white"
      stroke="#2563eb"
      strokeWidth="2.5"
    />
    {lines ? (
      lines.map((line, index) => (
        <text
          key={index}
          x={x + width / 2}
          y={y + height / 2 + (index - (lines.length - 1) / 2) * 18}
          textAnchor="middle"
          fill="#1f2937"
        >
          {line}
        </text>
      ))
    ) : (
      <text
        x={x + width / 2}
        y={y + height / 2 + 6}
        textAnchor="middle"
        fill="#1f2937"
      >
        {label}
      </text>
    )}
  </g>
);

// Flow arrow
const FlowArrow: React.FC<{ 
  x1: number; 
  y1: number; 
  x2: number; 
  y2: number; 
}> = ({ x1, y1, x2, y2 }) => {
  return (
    <g>
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
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#1f2937"
        strokeWidth="2.5"
        markerEnd="url(#arrowhead)"
      />
    </g>
  );
};

export const ActivityDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'activity-diagram-school-finder.svg';
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

    canvas.width = 800;
    canvas.height = 1100;

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
            link.download = 'activity-diagram-school-finder.png';
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

  const centerX = 400;
  const activityWidth = 420;
  const activityHeight = 70;

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
        <svg ref={svgRef} width="800" height="1100" className="max-w-full h-auto">
          {/* Background */}
          <rect width="800" height="1100" fill="#f9fafb" />

          {/* Title */}
          <text x="400" y="40" textAnchor="middle" className="text-xl" fill="#1f2937" fontWeight="bold">
            Activity Diagram - School Finder Web Application
          </text>

          {/* Start Node */}
          <StartEndNode x={centerX} y={100} />
          <text x={centerX} y={135} textAnchor="middle" fill="#1f2937" className="text-sm">
            Start
          </text>

          {/* Arrow from Start to Activity 1 */}
          <FlowArrow x1={centerX} y1={120} x2={centerX} y2={170} />

          {/* Activity 1: User opens the app */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={170} 
            width={activityWidth} 
            height={activityHeight} 
            label="User opens the School Finder Web App"
          />

          {/* Arrow to Activity 2 */}
          <FlowArrow x1={centerX} y1={240} x2={centerX} y2={280} />

          {/* Activity 2: User enters search */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={280} 
            width={activityWidth} 
            height={activityHeight} 
            lines={[
              "User enters search keyword or selects filters",
              "(location, type, performance)"
            ]}
          />

          {/* Arrow to Activity 3 */}
          <FlowArrow x1={centerX} y1={350} x2={centerX} y2={390} />

          {/* Activity 3: System processes */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={390} 
            width={activityWidth} 
            height={activityHeight} 
            label="System processes search input"
          />

          {/* Arrow to Activity 4 */}
          <FlowArrow x1={centerX} y1={460} x2={centerX} y2={500} />

          {/* Activity 4: System queries database */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={500} 
            width={activityWidth} 
            height={activityHeight} 
            label="System queries the school database"
          />

          {/* Arrow to Activity 5 */}
          <FlowArrow x1={centerX} y1={570} x2={centerX} y2={610} />

          {/* Activity 5: Display results */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={610} 
            width={activityWidth} 
            height={activityHeight} 
            label="Display list of matching schools"
          />

          {/* Arrow to Activity 6 */}
          <FlowArrow x1={centerX} y1={680} x2={centerX} y2={720} />

          {/* Activity 6: User selects school */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={720} 
            width={activityWidth} 
            height={activityHeight} 
            label="User selects a school"
          />

          {/* Arrow to Activity 7 */}
          <FlowArrow x1={centerX} y1={790} x2={centerX} y2={830} />

          {/* Activity 7: Display profile */}
          <Activity 
            x={centerX - activityWidth / 2} 
            y={830} 
            width={activityWidth} 
            height={activityHeight} 
            label="System displays full school profile"
          />

          {/* Arrow to End */}
          <FlowArrow x1={centerX} y1={900} x2={centerX} y2={960} />

          {/* End Node */}
          <StartEndNode x={centerX} y={980} isEnd={true} />
          <text x={centerX} y={1015} textAnchor="middle" fill="#1f2937" className="text-sm">
            End
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="mb-3">Activity Diagram Symbols:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-800 rounded-full flex-shrink-0"></div>
            <span>Start Node (Initial State)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-10 border-2 border-blue-600 bg-white rounded-2xl flex-shrink-0"></div>
            <span>Activity/Action</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="50" height="20" viewBox="0 0 50 20" className="flex-shrink-0">
              <line x1="0" y1="10" x2="40" y2="10" stroke="#1f2937" strokeWidth="2.5" />
              <polygon points="40,10 35,7 35,13" fill="#1f2937" />
            </svg>
            <span>Flow/Transition</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 30 30" className="flex-shrink-0">
              <circle cx="15" cy="15" r="12" fill="#1f2937" />
              <circle cx="15" cy="15" r="7" fill="white" />
            </svg>
            <span>End Node (Final State)</span>
          </div>
        </div>
      </div>

      {/* Process Description */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Process Flow Description:</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          This activity diagram illustrates the sequential process a user follows when searching for a school 
          in the School Finder Web Application. The flow starts when the user opens the application, enters 
          search criteria (keywords or filters such as location, type, or performance), and the system processes 
          the request by querying the database. Matching schools are displayed, allowing the user to select a 
          school and view its complete profile before completing the process.
        </p>
      </div>
    </div>
  );
};
