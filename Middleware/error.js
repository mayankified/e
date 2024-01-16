export const handleError = (res, status, message) => {
    res.status(status).json({
      success: false,
      message: message,
    });
  };