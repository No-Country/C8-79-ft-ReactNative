export const getInitials = (client) => {
    const firstName = client.firstName[0].toUpperCase();
    const firstLastName = client.lastName[0].toUpperCase();
    return firstName + firstLastName;
  };