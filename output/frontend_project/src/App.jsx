import React from 'react'
import RegistrationPage from './pages/RegistrationPage'
import DataManagementPage from './pages/DataManagementPage'
import SystemConfigPage from './pages/SystemConfigPage'
import PermissionManagementPage from './pages/PermissionManagementPage'
import FileUploadPage from './pages/FileUploadPage'
import DataVisualizationPage from './pages/DataVisualizationPage'
import MessageManagementPage from './pages/MessageManagementPage'
import AppointmentPage from './pages/AppointmentPage'
import SurveyPage from './pages/SurveyPage'
import PersonalizationPage from './pages/PersonalizationPage'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <RegistrationPage />
      <DataManagementPage />
      <SystemConfigPage />
      <PermissionManagementPage />
      <FileUploadPage />
      <DataVisualizationPage />
      <MessageManagementPage />
      <AppointmentPage />
      <SurveyPage />
      <PersonalizationPage />
    </div>
  )
}

export default App