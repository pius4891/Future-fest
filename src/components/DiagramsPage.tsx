import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UseCaseDiagram } from './UseCaseDiagram';
import { ERDiagram } from './ERDiagram';
import { ActivityDiagram } from './ActivityDiagram';
import { DatabaseDiagram } from './DatabaseDiagram';
import { ButtonComponentDiagram } from './ButtonComponentDiagram';
import { DataFlowDiagram } from './DataFlowDiagram';
import { QueryTreeDiagram } from './QueryTreeDiagram';
import { StudentSystemComponentDiagram } from './StudentSystemComponentDiagram';

type DiagramsPageProps = {
  onNavigateToHome: () => void;
};

export const DiagramsPage: React.FC<DiagramsPageProps> = ({ onNavigateToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onNavigateToHome} className="gap-2">
                <ArrowLeft className="size-4" />
                Back to App
              </Button>
              <div className="flex items-center gap-2">
                <GraduationCap className="size-8 text-blue-600" />
                <h1 className="text-blue-600">School Finder - Documentation</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2">UML Diagrams & Documentation</h2>
          <p className="text-gray-600">
            Comprehensive diagrams for the School Finder Web Application
          </p>
        </div>
        
        <Tabs defaultValue="use-case" className="w-full">
          <TabsList className="grid w-full max-w-6xl mx-auto grid-cols-8 mb-8">
            <TabsTrigger value="use-case">Use Case</TabsTrigger>
            <TabsTrigger value="er-diagram">ER Diagram</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="component">Component</TabsTrigger>
            <TabsTrigger value="dfd">DFD Level 2</TabsTrigger>
            <TabsTrigger value="query-tree">Query Tree</TabsTrigger>
            <TabsTrigger value="student-system">Student System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="use-case">
            <div className="mb-4 text-center">
              <h3>Use Case Diagram – School Finder Web Application</h3>
            </div>
            <UseCaseDiagram />
          </TabsContent>
          
          <TabsContent value="er-diagram">
            <div className="mb-4 text-center">
              <h3>Entity–Relationship Diagram – School Finder Web Application</h3>
            </div>
            <ERDiagram />
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="mb-4 text-center">
              <h3>Activity Diagram – School Finder Web Application</h3>
            </div>
            <ActivityDiagram />
          </TabsContent>
          
          <TabsContent value="database">
            <div className="mb-4 text-center">
              <h3>Database Schema Diagram – School Finder Web Application</h3>
            </div>
            <DatabaseDiagram />
          </TabsContent>

          <TabsContent value="component">
            <div className="mb-4 text-center">
              <h3>Component Diagram – Button Component</h3>
            </div>
            <ButtonComponentDiagram />
          </TabsContent>

          <TabsContent value="dfd">
            <div className="mb-4 text-center">
              <h3>Level 2 Data Flow Diagram – School Finder Web Application</h3>
            </div>
            <DataFlowDiagram />
          </TabsContent>

          <TabsContent value="query-tree">
            <div className="mb-4 text-center">
              <h3>Query Tree Diagram – Optimized SQL Execution Plan</h3>
            </div>
            <QueryTreeDiagram />
          </TabsContent>

          <TabsContent value="student-system">
            <div className="mb-4 text-center">
              <h3>Component Diagram – Student Information System</h3>
            </div>
            <StudentSystemComponentDiagram />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};