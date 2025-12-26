import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

// Tree Node Component
const TreeNode: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  subLabel?: string;
  type: 'operation' | 'relation';
}> = ({ x, y, width, height, label, subLabel, type }) => (
  <g>
    {type === 'operation' ? (
      <>
        <ellipse
          cx={x}
          cy={y}
          rx={width / 2}
          ry={height / 2}
          fill="#3b82f6"
          stroke="#1e40af"
          strokeWidth="2.5"
        />
        <text
          x={x}
          y={subLabel ? y - 6 : y + 6}
          textAnchor="middle"
          fill="white"
          fontWeight="600"
        >
          {label}
        </text>
        {subLabel && (
          <text
            x={x}
            y={y + 10}
            textAnchor="middle"
            fill="white"
            fontSize="13"
          >
            {subLabel}
          </text>
        )}
      </>
    ) : (
      <>
        <rect
          x={x - width / 2}
          y={y - height / 2}
          width={width}
          height={height}
          rx="5"
          fill="#10b981"
          stroke="#059669"
          strokeWidth="2.5"
        />
        <text
          x={x}
          y={y + 6}
          textAnchor="middle"
          fill="white"
          fontWeight="600"
        >
          {label}
        </text>
      </>
    )}
  </g>
);

// Connection Line
const Connection: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}> = ({ x1, y1, x2, y2 }) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#1f2937"
    strokeWidth="2.5"
  />
);

export const QueryTreeDiagram: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const downloadAsSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'query-tree-diagram.svg';
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

    canvas.width = 1000;
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
            link.download = 'query-tree-diagram.png';
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
        <svg ref={svgRef} width="1000" height="900" className="max-w-full h-auto">
          {/* Background */}
          <rect width="1000" height="900" fill="#f9fafb" />

          {/* Title */}
          <text x="500" y="40" textAnchor="middle" fontSize="22" fill="#1f2937" fontWeight="bold">
            Query Tree Diagram - Optimized Query Execution Plan
          </text>

          {/* Level 6 - Final Result (Root) */}
          <TreeNode
            x={500}
            y={120}
            width={240}
            height={60}
            label="π price, location"
            subLabel="(PROJECT)"
            type="operation"
          />

          {/* Connection from Level 6 to Level 5 */}
          <Connection x1={500} y1={150} x2={500} y2={200} />

          {/* Level 5 - Second Join */}
          <TreeNode
            x={500}
            y={230}
            width={240}
            height={60}
            label="⋈ shopID"
            subLabel="(JOIN)"
            type="operation"
          />

          {/* Connections from Level 5 to Level 4 */}
          <Connection x1={500} y1={260} x2={350} y2={320} />
          <Connection x1={500} y1={260} x2={650} y2={320} />

          {/* Level 4 Left - First Join */}
          <TreeNode
            x={350}
            y={350}
            width={240}
            height={60}
            label="⋈ productno"
            subLabel="(JOIN)"
            type="operation"
          />

          {/* Level 4 Right - Selection on Shop */}
          <TreeNode
            x={650}
            y={350}
            width={280}
            height={60}
            label="σ location = 'London'"
            subLabel="(SELECT)"
            type="operation"
          />

          {/* Connections from Level 4 Left to Level 3 */}
          <Connection x1={350} y1={380} x2={250} y2={440} />
          <Connection x1={350} y1={380} x2={450} y2={440} />

          {/* Connection from Level 4 Right to Level 3 */}
          <Connection x1={650} y1={380} x2={650} y2={470} />

          {/* Level 3 Left - Selection on Product */}
          <TreeNode
            x={250}
            y={470}
            width={280}
            height={60}
            label="σ ItemName = 'Navy Suit'"
            subLabel="(SELECT)"
            type="operation"
          />

          {/* Level 3 Middle - Stocked relation */}
          <TreeNode
            x={450}
            y={470}
            width={140}
            height={50}
            label="Stocked"
            type="relation"
          />

          {/* Level 3 Right - Shop relation */}
          <TreeNode
            x={650}
            y={500}
            width={120}
            height={50}
            label="Shop"
            type="relation"
          />

          {/* Connection from Level 3 Left to Level 2 */}
          <Connection x1={250} y1={500} x2={250} y2={560} />

          {/* Level 2 - Product relation */}
          <TreeNode
            x={250}
            y={590}
            width={130}
            height={50}
            label="Product"
            type="relation"
          />

          {/* Execution Order Annotations */}
          <g>
            <text x="50" y="600" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 1: Filter Product
            </text>
            <text x="50" y="480" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 2: Apply selection
            </text>
            <text x="520" y="510" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 3: Filter Shop
            </text>
            <text x="520" y="360" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 4: Apply selection
            </text>
            <text x="50" y="360" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 5: Join on productno
            </text>
            <text x="720" y="240" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 6: Join on shopID
            </text>
            <text x="720" y="130" fill="#6366f1" fontWeight="600" fontSize="14">
              Step 7: Project result
            </text>
          </g>

          {/* Legend Box */}
          <g>
            <rect x="50" y="650" width="900" height="220" fill="white" stroke="#d1d5db" strokeWidth="2" rx="8" />
            
            <text x="500" y="680" textAnchor="middle" fontWeight="600" fontSize="16" fill="#1f2937">
              Query Tree Legend & Optimization Strategy
            </text>

            {/* Left Column */}
            <ellipse cx="120" cy="720" rx="60" ry="25" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
            <text x="120" y="726" textAnchor="middle" fill="white" fontWeight="600">
              Operation
            </text>
            <text x="220" y="726" fill="#1f2937" fontSize="14">
              Relational algebra operations (σ, π, ⋈)
            </text>

            <rect x="70" y="760" width="100" height="40" rx="5" fill="#10b981" stroke="#059669" strokeWidth="2" />
            <text x="120" y="785" textAnchor="middle" fill="white" fontWeight="600">
              Relation
            </text>
            <text x="220" y="785" fill="#1f2937" fontSize="14">
              Base tables (Product, Shop, Stocked)
            </text>

            {/* Right Column - Optimization Notes */}
            <text x="520" y="710" fill="#1f2937" fontSize="14" fontWeight="600">
              Optimization Techniques Applied:
            </text>
            <text x="530" y="735" fill="#374151" fontSize="13">
              • Push selections down (apply WHERE clauses early)
            </text>
            <text x="530" y="757" fill="#374151" fontSize="13">
              • Reduce data size before expensive JOIN operations
            </text>
            <text x="530" y="779" fill="#374151" fontSize="13">
              • Filter Product by ItemName before joining
            </text>
            <text x="530" y="801" fill="#374151" fontSize="13">
              • Filter Shop by location before joining
            </text>
            <text x="530" y="823" fill="#374151" fontSize="13">
              • Project only required columns (price, location) at end
            </text>
          </g>
        </svg>
      </div>

      {/* Query Information */}
      <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
        <h3 className="mb-3">Original SQL Query:</h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`SELECT Product.price, Shop.Location 
FROM Product 
JOIN Stocked ON Stocked.productno = product.productno 
JOIN Shop ON Shop.shopID = Stocked.ShopID 
WHERE Product.ItemName = 'Navy Suit' 
  AND Shop.location = 'London';`}
        </pre>
      </div>

      {/* Relational Algebra */}
      <div className="mt-6 p-4 bg-purple-50 rounded border border-purple-200">
        <h3 className="mb-3">Relational Algebra Expressions:</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2"><strong>Basic Form (Unoptimized):</strong></p>
            <div className="bg-white p-4 rounded border border-purple-300 font-mono text-sm overflow-x-auto">
              <p className="mb-2">π<sub>price, location</sub> (</p>
              <p className="ml-4 mb-2">σ<sub>ItemName = 'Navy Suit' ∧ location = 'London'</sub> (</p>
              <p className="ml-8">Product ⋈<sub>Product.productno = Stocked.productno</sub> Stocked ⋈<sub>Stocked.shopID = Shop.shopID</sub> Shop</p>
              <p className="ml-4">)</p>
              <p>)</p>
            </div>
            <p className="text-xs text-gray-600 mt-2 italic">
              This performs joins first, then applies all selections on the large intermediate result.
            </p>
          </div>

          <div>
            <p className="text-sm mb-2"><strong>Optimized Form (Selection Push-Down):</strong></p>
            <div className="bg-white p-4 rounded border border-purple-300 font-mono text-sm overflow-x-auto">
              <p className="mb-2">π<sub>price, location</sub> (</p>
              <p className="ml-4 mb-2">(</p>
              <p className="ml-8 mb-2">(σ<sub>ItemName = 'Navy Suit'</sub> (Product))</p>
              <p className="ml-8 mb-2">⋈<sub>productno</sub></p>
              <p className="ml-8 mb-2">Stocked</p>
              <p className="ml-4 mb-2">)</p>
              <p className="ml-4 mb-2">⋈<sub>shopID</sub></p>
              <p className="ml-4 mb-2">(σ<sub>location = 'London'</sub> (Shop))</p>
              <p>)</p>
            </div>
            <p className="text-xs text-gray-600 mt-2 italic">
              This applies selections early to reduce data volume before joins, matching the query tree above.
            </p>
          </div>

          <div className="mt-4 p-3 bg-purple-100 rounded">
            <p className="text-sm"><strong>Relational Algebra Symbols:</strong></p>
            <ul className="text-sm mt-2 space-y-1 ml-4">
              <li>• <span className="font-mono">σ</span> (sigma) = Selection (WHERE clause)</li>
              <li>• <span className="font-mono">π</span> (pi) = Projection (SELECT clause)</li>
              <li>• <span className="font-mono">⋈</span> (bowtie) = Join operation</li>
              <li>• <span className="font-mono">∧</span> (and) = Logical AND</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Execution Plan Description */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 className="mb-3">Execution Plan Explanation:</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            This query tree represents the <strong>most efficient execution plan</strong> by applying 
            query optimization techniques. The tree is read from bottom to top, showing the sequence 
            of operations.
          </p>
          
          <div className="space-y-2">
            <p><strong>Optimization Strategy:</strong></p>
            <ol className="ml-6 space-y-1 list-decimal">
              <li>
                <strong>Selection Push-Down:</strong> Apply WHERE conditions (σ) immediately to base tables 
                before joins. This drastically reduces the number of tuples processed in subsequent operations.
              </li>
              <li>
                <strong>Filtered Product Table:</strong> First, filter Product table where ItemName = 'Navy Suit' 
                (likely returns very few rows).
              </li>
              <li>
                <strong>Filtered Shop Table:</strong> Simultaneously, filter Shop table where location = 'London' 
                (reduces Shop tuples early).
              </li>
              <li>
                <strong>First Join:</strong> Join the filtered Product with Stocked on productno. Since Product 
                is already filtered, this join processes minimal data.
              </li>
              <li>
                <strong>Second Join:</strong> Join the result with filtered Shop on shopID. Both inputs are 
                already reduced in size.
              </li>
              <li>
                <strong>Final Projection:</strong> Project only the required columns (price, location) to 
                produce the final result set.
              </li>
            </ol>
          </div>

          <p className="pt-2 border-t border-blue-200">
            <strong>Performance Benefit:</strong> By filtering data early and reducing intermediate result 
            sizes, this plan minimizes I/O operations and memory usage, resulting in significantly faster 
            query execution compared to performing joins first and filtering later.
          </p>
        </div>
      </div>

      {/* Table Schemas */}
      <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
        <h3 className="mb-3">Table Schemas:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-green-300">
            <p className="font-semibold text-green-800 mb-2">Product</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-mono">ProductNo</span> (PK)</li>
              <li>• <span className="font-mono">ItemName</span></li>
              <li>• <span className="font-mono">Price</span></li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded border border-green-300">
            <p className="font-semibold text-green-800 mb-2">Shop</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-mono">shopID</span> (PK)</li>
              <li>• <span className="font-mono">location</span></li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded border border-green-300">
            <p className="font-semibold text-green-800 mb-2">Stocked</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <span className="font-mono">ProductNo</span> (FK)</li>
              <li>• <span className="font-mono">shopID</span> (FK)</li>
              <li>• <span className="font-mono">amount</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};