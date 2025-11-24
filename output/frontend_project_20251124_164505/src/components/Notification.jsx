import React from 'react';

const Notification = ({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  duration = 500