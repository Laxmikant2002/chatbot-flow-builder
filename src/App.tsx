import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlowProvider,
  Handle,
  Position,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

// Text Node Component
const TextNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as { text?: string };
  
  return (
    <div
      className={`text-node ${selected ? 'selected' : ''}`}
      style={{
        background: 'white',
        border: selected ? '2px solid #0066cc' : '2px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '150px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#000000'
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#0066cc',
          width: '8px',
          height: '8px'
        }}
      />
      
      <div style={{ 
        fontSize: '14px', 
        fontWeight: 'bold', 
        marginBottom: '8px',
        color: '#000000'
      }}>
        Text Node
      </div>
      
      <div style={{ 
        fontSize: '12px', 
        color: '#666666',
        wordBreak: 'break-word',
        minHeight: '20px'
      }}>
        {nodeData?.text || 'Enter message text...'}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#0066cc',
          width: '8px',
          height: '8px'
        }}
      />
    </div>
  );
};

// Nodes Panel Component
const NodesPanel: React.FC<{ onDragStart: (event: React.DragEvent, nodeType: string) => void }> = ({ onDragStart }) => {
  return (
    <div
      style={{
        width: '250px',
        background: 'white',
        borderRight: '2px solid #e0e0e0',
        padding: '20px',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ 
        margin: '0 0 20px 0', 
        fontSize: '18px', 
        fontWeight: 'bold',
        color: '#000000',
        borderBottom: '2px solid #0066cc',
        paddingBottom: '10px'
      }}>
        Nodes Panel
      </h2>
      
      <div
        draggable
        onDragStart={(event) => onDragStart(event, 'textNode')}
        style={{
          background: 'white',
          border: '2px solid #0066cc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          cursor: 'grab',
          transition: 'all 0.2s ease',
          color: '#000000'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          color: '#0066cc'
        }}>
          Text Node
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#666666'
        }}>
          Drag to add a message node
        </div>
      </div>
    </div>
  );
};

// Settings Panel Component
const SettingsPanel: React.FC<{ 
  selectedNode: Node | null; 
  onNodeUpdate: (nodeId: string, data: any) => void; 
  onClose: () => void; 
}> = ({ selectedNode, onNodeUpdate, onClose }) => {
  if (!selectedNode) return null;

  const handleTextChange = (text: string) => {
    onNodeUpdate(selectedNode.id, { ...selectedNode.data, text });
  };

  return (
    <div
      style={{
        width: '250px',
        background: 'white',
        borderRight: '2px solid #e0e0e0',
        padding: '20px',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #0066cc',
        paddingBottom: '10px'
      }}>
        <h2 style={{ 
          margin: '0', 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#000000'
        }}>
          Settings
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666666',
            padding: '0',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#000000'
        }}>
          Message Text
        </label>
        <textarea
          value={(selectedNode.data as { text?: string })?.text || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '8px 12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            resize: 'vertical',
            color: '#000000',
            background: 'white'
          }}
          placeholder="Enter your message text here..."
        />
      </div>
    </div>
  );
};

// Save Button Component
const SaveButton: React.FC<{ nodes: Node[]; edges: Edge[]; onSave: () => void }> = ({ nodes, edges, onSave }) => {
  const validateFlow = () => {
    if (nodes.length === 0) {
      return { isValid: false, error: 'No nodes in the flow' };
    }
    
    if (nodes.length === 1) {
      return { isValid: true, error: null };
    }
    
    // Check if more than one node has empty target handles (no incoming edges)
    const nodesWithNoIncomingEdges = nodes.filter(node => {
      return !edges.some(edge => edge.target === node.id);
    });
    
    if (nodesWithNoIncomingEdges.length > 1) {
      return { 
        isValid: false, 
        error: `Error: More than one node has empty target handles. Found ${nodesWithNoIncomingEdges.length} nodes with no incoming connections.` 
      };
    }
    
    return { isValid: true, error: null };
  };

  const { isValid, error } = validateFlow();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {error && (
        <div style={{
          background: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '4px',
          padding: '12px 16px',
          marginBottom: '12px',
          maxWidth: '300px',
          color: '#d32f2f',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <strong>Validation Error:</strong> {error}
        </div>
      )}
      
      <button
        onClick={onSave}
        disabled={!isValid}
        style={{
          background: isValid ? '#0066cc' : '#cccccc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isValid ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minWidth: '120px'
        }}
      >
        {isValid ? 'Save Flow' : 'Cannot Save'}
      </button>
    </div>
  );
};

// Main Flow Builder Component
const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const nodeTypes = {
    textNode: TextNode,
  };

  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an outgoing edge
      const sourceHasEdge = edges.some((edge: Edge) => 
        edge.source === params.source
      );
      
      if (sourceHasEdge) {
        // Prevent connection if source already has an edge
        alert('Each node can only have one outgoing connection from its source handle.');
        return;
      }
      
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, edges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (reactFlowBounds && reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNodeId = `node_${Date.now()}`;
        const newNode: Node = {
          id: newNodeId,
          type: 'textNode',
          position,
          data: { text: 'New message' },
        };

        setNodes((nds) => [...nds, newNode] as any);
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node: any) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }) as any
    );
  }, [setNodes]);

  const onSave = useCallback(() => {
    console.log('Saving flow:', { nodes, edges });
    alert('Flow saved successfully!');
  }, [nodes, edges]);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'white' }}>
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeUpdate={onNodeUpdate}
          onClose={() => setSelectedNode(null)}
        />
      ) : (
        <NodesPanel onDragStart={onDragStart} />
      )}
      
      <div style={{ flex: 1, height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          style={{
            background: '#fafafa'
          }}
        >
          <Controls style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }} />
          <Background color="#e0e0e0" gap={20} />
        </ReactFlow>
      </div>
      
      <SaveButton nodes={nodes} edges={edges} onSave={onSave} />
    </div>
  );
};

// App Component
function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

export default App;
