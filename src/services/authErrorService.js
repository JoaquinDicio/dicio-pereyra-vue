export const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return { emailError: 'El correo ya está en uso' };
      case 'auth/invalid-email':
        return { emailError: 'El correo electrónico no es válido' };
      case 'auth/weak-password':
        return { passwordError: 'La contraseña debe tener al menos 6 caracteres' };
      case 'auth/missing-password':
        return { passwordError: 'Por favor ingrese una contraseña' };
      default:
        return { emailError: 'Error al crear el usuario: ' + errorCode };
    }
  };
  