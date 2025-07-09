# Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React, TypeScript, and React Flow. This application allows users to create and manage chatbot conversation flows through an intuitive drag-and-drop interface.

## 🚀 Live Demo

**🌐 Try it live:** [https://chatbot-flow-builder-c3pv55scp-laxmikant2002s-projects.vercel.app](https://chatbot-flow-builder-c3pv55scp-laxmikant2002s-projects.vercel.app)

The application is deployed on Vercel and ready to use! Experience all the features including drag-and-drop node creation, flow validation, and real-time editing.

## Features

### Core Functionality
- **Text Nodes**: Create message nodes by dragging from the Nodes Panel
- **Drag & Drop**: Intuitive interface for adding nodes to the canvas
- **Connection Management**: Connect nodes with edges to define flow order
- **Real-time Editing**: Edit node content through the Settings Panel
- **Flow Validation**: Automatic validation with error reporting

### Node System
- **Source Handle**: Each node has one source handle (right side) for outgoing connections
- **Target Handle**: Each node has one target handle (left side) for incoming connections
- **Multiple Instances**: Support for multiple text nodes in a single flow
- **Visual Feedback**: Selected nodes are highlighted with blue borders

### Panel System
- **Nodes Panel**: Sidebar for dragging new nodes (replaces with Settings Panel when node is selected)
- **Settings Panel**: Edit node properties when a node is selected
- **Extensible Design**: Ready for future node types beyond text nodes

### Validation & Save
- **Flow Validation**: Ensures only one starting node (no incoming edges)
- **Error Display**: Clear error messages for invalid flows
- **Save Functionality**: Validates and saves flow data

## Design System

### Color Scheme
- **Background**: White (#ffffff)
- **Text**: Black (#000000)
- **Accent**: Blue (#0066cc)
- **Borders**: Light Gray (#e0e0e0)
- **Shadows**: Subtle gray shadows for depth

### Typography
- **Primary Font**: Arial, sans-serif
- **System Fonts**: Fallback to system fonts for better performance
- **Hierarchy**: Clear typographic hierarchy with different font weights and sizes

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🚀 Deployment

This project is deployed on **Vercel** for optimal performance and reliability.

### Live Application
- **Production URL**: [https://chatbot-flow-builder-c3pv55scp-laxmikant2002s-projects.vercel.app](https://chatbot-flow-builder-c3pv55scp-laxmikant2002s-projects.vercel.app)
- **Platform**: Vercel
- **Build Status**: ✅ Active
- **Auto-Deploy**: Enabled from main branch

### Deploy Your Own
To deploy your own instance:

1. **Fork this repository**
2. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```
3. **Follow the prompts** and your app will be live!

The project includes a `vercel.json` configuration file optimized for React applications.

## Usage

### Creating a Flow
1. **Add Nodes**: Drag "Text Node" from the left panel to the canvas
2. **Connect Nodes**: Click and drag from a node's right handle to another node's left handle
3. **Edit Content**: Click on a node to open the Settings Panel and edit the message text
4. **Validate & Save**: Use the Save button to validate and save your flow

### Flow Rules
- Each node can have multiple incoming connections
- Each node can have only one outgoing connection
- Only one node should have no incoming connections (starting node)
- The flow must be connected (no isolated nodes)

### Keyboard Shortcuts
- **Delete**: Remove selected nodes (when implemented)
- **Ctrl/Cmd + Z**: Undo (when implemented)
- **Ctrl/Cmd + Y**: Redo (when implemented)

## Technical Stack

### Frontend
- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe development
- **React Flow**: Flow diagram library
- **CSS**: Custom styling with modern CSS features

### Dependencies
- `@xyflow/react`: Flow diagram components
- `react`: Core React library
- `react-dom`: React DOM rendering
- `typescript`: TypeScript support

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Global styles and component styles
├── index.tsx        # Application entry point
└── components/      # Component directory (future use)
```

## Future Enhancements

### Planned Features
- **Additional Node Types**: Condition nodes, API nodes, user input nodes
- **Flow Templates**: Pre-built templates for common chatbot patterns
- **Export/Import**: Save and load flows as JSON files
- **Undo/Redo**: History management for flow changes
- **Collaboration**: Real-time collaboration features
- **Testing**: Unit and integration tests

### Technical Improvements
- **Performance**: Optimize for large flows with many nodes
- **Accessibility**: Improve keyboard navigation and screen reader support
- **Mobile Support**: Responsive design for mobile devices
- **Persistence**: Backend integration for flow storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
