import React, { useState } from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { useChat } from './hooks/useChat';

const DRAWER_WIDTH = 280;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const {
    sessions,
    activeSessionId,
    messages,
    isLoading,
    sendMessage,
    stopStreaming,
    createNewSession,
    deleteSession,
    switchSession,
  } = useChat();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleSelectSession = (id) => {
    switchSession(id);
    setSidebarOpen(false);
  };

  const sidebarProps = {
    sessions,
    activeSessionId,
    onNewChat: createNewSession,
    onSelectSession: handleSelectSession,
    onDeleteSession: deleteSession,
  };

  return (
    <Box
      id="app-root"
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              position: 'relative',
              height: '100%',
              borderRight: 'none',
            },
          }}
        >
          <Sidebar {...sidebarProps} />
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar {...sidebarProps} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Header
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
          showMenuButton={isMobile}
        />
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSend={sendMessage}
          onStop={stopStreaming}
        />
      </Box>
    </Box>
  );
}
