import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import mermaid from 'mermaid';

export const DataFlowDiagram: React.FC = () => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });

    if (mermaidRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  const mermaidCode = `flowchart LR
    %% External Entity
    User([User])

    %% Process 1: Perform Search
    subgraph P1["Process 1: Perform Search"]
        P1_1[1.1 Validate Search Input]
        P1_2[1.2 Query School Database]
        P1_3[1.3 Return Search Results]
        P1_1 --> P1_2
        P1_2 --> P1_3
    end

    %% Process 2: Apply Filters
    subgraph P2["Process 2: Apply Filters"]
        P2_1[2.1 Select Filter Criteria]
        P2_2[2.2 Filter School Data]
        P2_3[2.3 Display Filtered Results]
        P2_1 --> P2_2
        P2_2 --> P2_3
    end

    %% Process 3: View School Details
    subgraph P3["Process 3: View School Details"]
        P3_1[3.1 Fetch School Profile]
        P3_2[3.2 Retrieve Extra Data]
        P3_3[3.3 Return Detailed School Page]
        P3_1 --> P3_2
        P3_2 --> P3_3
    end

    %% Data Stores
    D1[(D1: School Database)]
    D2[(D2: Performance Records)]
    D3[(D3: Fees & General Info)]

    %% Data Flows - Perform Search
    User -->|Search Query| P1
    P1_2 -->|Query| D1
    D1 -->|Search Results| P1_3
    P1_3 -->|Search Results| User

    %% Data Flows - Apply Filters
    User -->|Filter Criteria| P2
    P2_2 -.->|Read| D1
    P2_3 -->|Filtered Data| User

    %% Data Flows - View School Details
    User -->|School Selection| P3
    P3_1 -.->|Fetch| D1
    P3_2 -.->|Retrieve| D2
    P3_2 -.->|Retrieve| D3
    P3_3 -->|Full School Profile| User

    %% Styling
    classDef processClass fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    classDef dataStoreClass fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    classDef entityClass fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef subProcessClass fill:#60a5fa,stroke:#2563eb,stroke-width:1.5px,color:#fff

    class User entityClass
    class D1,D2,D3 dataStoreClass
    class P1_1,P1_2,P1_3,P2_1,P2_2,P2_3,P3_1,P3_2,P3_3 subProcessClass
  `;

  const downloadAsSVG = () => {
    if (!svgContainerRef.current) return;
    
    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = svgElement.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-flow-diagram-level2-school-finder.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsPNG = () => {
    if (!svgContainerRef.current) return;

    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Get SVG dimensions
    const svgRect = svgElement.getBoundingClientRect();
    canvas.width = svgRect.width * 2;
    canvas.height = svgRect.height * 2;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data-flow-diagram-level2-school-finder.png';
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

      <div className="overflow-x-auto" ref={svgContainerRef}>
        <div className="mermaid" ref={mermaidRef}>
          {mermaidCode}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="mb-3">Data Flow Diagram (Level 2) Legend:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-16 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">
              User
            </div>
            <span>External Entity</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xs flex-shrink-0">
              Process
            </div>
            <span>Process/Sub-Process</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
              D1
            </div>
            <span>Data Store</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="60" height="20" viewBox="0 0 60 20" className="flex-shrink-0">
              <line x1="0" y1="10" x2="50" y2="10" stroke="#1f2937" strokeWidth="2" />
              <polygon points="50,10 45,7 45,13" fill="#1f2937" />
            </svg>
            <span>Data Flow</span>
          </div>
        </div>
      </div>

      {/* Process Description */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Level 2 DFD Description:</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          This Level 2 Data Flow Diagram provides a detailed breakdown of the School Finder Web Application's 
          core processes. It illustrates how data flows between the user, three main processes, and three 
          data stores.
        </p>
        
        <div className="space-y-3 text-sm">
          <div>
            <strong>Process 1: Perform Search</strong>
            <ul className="ml-4 mt-1 list-disc text-gray-700">
              <li>Validates user search input</li>
              <li>Queries the School Database</li>
              <li>Returns search results to the user</li>
            </ul>
          </div>
          
          <div>
            <strong>Process 2: Apply Filters</strong>
            <ul className="ml-4 mt-1 list-disc text-gray-700">
              <li>Accepts filter criteria from user</li>
              <li>Filters school data based on criteria</li>
              <li>Displays filtered results</li>
            </ul>
          </div>
          
          <div>
            <strong>Process 3: View School Details</strong>
            <ul className="ml-4 mt-1 list-disc text-gray-700">
              <li>Fetches school profile from School Database</li>
              <li>Retrieves additional data from Performance Records and Fees & General Info</li>
              <li>Returns complete school profile to user</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <strong>Data Stores:</strong>
          <ul className="ml-4 mt-1 list-disc text-gray-700 text-sm">
            <li><strong>D1: School Database</strong> - Core school information and profiles</li>
            <li><strong>D2: Performance Records</strong> - Academic performance metrics and statistics</li>
            <li><strong>D3: Fees & General Information</strong> - Tuition fees, contact details, and general data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
