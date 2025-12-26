import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

export const ButtonComponentDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'button-component-diagram.svg';
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
            link.download = 'button-component-diagram.png';
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
        <svg ref={svgRef} width="800" height="900" className="max-w-full h-auto">
          {/* Background */}
          <rect width="800" height="900" fill="#f9fafb" />

          {/* Title */}
          <text x="400" y="40" textAnchor="middle" className="text-xl" fill="#1f2937" fontWeight="bold" fontSize="24">
            Component Diagram - Button Component
          </text>

          {/* Main Component Box */}
          <g transform="translate(200, 100)">
            {/* Outer rectangle */}
            <rect
              x="0"
              y="0"
              width="400"
              height="650"
              fill="white"
              stroke="#2563eb"
              strokeWidth="3"
            />

            {/* Component Name Header */}
            <rect
              x="0"
              y="0"
              width="400"
              height="60"
              fill="#2563eb"
              stroke="#2563eb"
              strokeWidth="3"
            />
            <text
              x="200"
              y="40"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="bold"
            >
              Button
            </text>

            {/* Horizontal line after header */}
            <line x1="0" y1="60" x2="400" y2="60" stroke="#2563eb" strokeWidth="3" />

            {/* PROPERTIES SECTION */}
            <rect
              x="0"
              y="60"
              width="400"
              height="40"
              fill="#eff6ff"
              stroke="none"
            />
            <text
              x="20"
              y="85"
              fill="#1f2937"
              fontSize="16"
              fontWeight="bold"
            >
              Properties
            </text>

            <line x1="0" y1="100" x2="400" y2="100" stroke="#cbd5e1" strokeWidth="1" />

            {/* Properties list */}
            <text x="30" y="125" fill="#374151" fontSize="14">- foregroundColor : Color</text>
            <text x="30" y="150" fill="#374151" fontSize="14">- backgroundColor : Color</text>
            <text x="30" y="175" fill="#374151" fontSize="14">- name : String</text>
            <text x="30" y="200" fill="#374151" fontSize="14">- size : Dimension</text>
            <text x="30" y="225" fill="#374151" fontSize="14">- image : Image</text>

            {/* Divider line */}
            <line x1="0" y1="250" x2="400" y2="250" stroke="#2563eb" strokeWidth="3" />

            {/* METHODS SECTION */}
            <rect
              x="0"
              y="250"
              width="400"
              height="40"
              fill="#eff6ff"
              stroke="none"
            />
            <text
              x="20"
              y="275"
              fill="#1f2937"
              fontSize="16"
              fontWeight="bold"
            >
              Methods
            </text>

            <line x1="0" y1="290" x2="400" y2="290" stroke="#cbd5e1" strokeWidth="1" />

            {/* Methods list - Setters */}
            <text x="30" y="315" fill="#374151" fontSize="14">+ setForegroundColor(color : Color) : void</text>
            <text x="30" y="340" fill="#374151" fontSize="14">+ getForegroundColor() : Color</text>
            <text x="30" y="365" fill="#374151" fontSize="14">+ setBackgroundColor(color : Color) : void</text>
            <text x="30" y="390" fill="#374151" fontSize="14">+ getBackgroundColor() : Color</text>
            <text x="30" y="415" fill="#374151" fontSize="14">+ setName(name : String) : void</text>
            <text x="30" y="440" fill="#374151" fontSize="14">+ getName() : String</text>
            <text x="30" y="465" fill="#374151" fontSize="14">+ setSize(size : Dimension) : void</text>
            <text x="30" y="490" fill="#374151" fontSize="14">+ getSize() : Dimension</text>
            <text x="30" y="515" fill="#374151" fontSize="14">+ setImage(image : Image) : void</text>
            <text x="30" y="540" fill="#374151" fontSize="14">+ getImage() : Image</text>

            {/* Divider line */}
            <line x1="0" y1="565" x2="400" y2="565" stroke="#2563eb" strokeWidth="3" />

            {/* EVENTS SECTION */}
            <rect
              x="0"
              y="565"
              width="400"
              height="40"
              fill="#eff6ff"
              stroke="none"
            />
            <text
              x="20"
              y="590"
              fill="#1f2937"
              fontSize="16"
              fontWeight="bold"
            >
              Events
            </text>

            <line x1="0" y1="605" x2="400" y2="605" stroke="#cbd5e1" strokeWidth="1" />

            {/* Events list */}
            <text x="30" y="630" fill="#374151" fontSize="14">+ pressButton() : void</text>
          </g>

          {/* Legend */}
          <g transform="translate(100, 780)">
            <text x="0" y="0" fill="#1f2937" fontSize="14" fontWeight="bold">
              Notation:
            </text>
            <text x="0" y="25" fill="#374151" fontSize="13">
              - (minus) = private property
            </text>
            <text x="0" y="48" fill="#374151" fontSize="13">
              + (plus) = public method/event
            </text>
            <text x="300" y="25" fill="#374151" fontSize="13">
              PropertyName : DataType
            </text>
            <text x="300" y="48" fill="#374151" fontSize="13">
              methodName(parameters) : ReturnType
            </text>
          </g>
        </svg>
      </div>

      {/* Description */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Component Structure:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Properties:</span> Define the visual and structural attributes of the button component 
            including colors, name identifier, dimensions, and optional image.
          </p>
          <p>
            <span className="font-semibold">Methods:</span> Getter and setter methods provide controlled access to modify and 
            retrieve the component's properties following encapsulation principles.
          </p>
          <p>
            <span className="font-semibold">Events:</span> The pressButton event is triggered when the user interacts with 
            the button, enabling action handling in the application.
          </p>
        </div>
      </div>
    </div>
  );
};
