db.createUser({
  user: 'user1',
  pwd: 'test123',
  roles: [
    {
      role: 'readWrite',
      db: 'fine_mongodb',
    },
  ],
});