const mongoose = require('mongoose');
const Sessionschema = new mongoose.Schema({
  sessionId: String,
  userId: String,
  expirationTime: Date,
});const session = mongoose.model('session', Sessionschema);

async function createSession(userId) {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 24);

  const newsession = new session({
    sessionId: generateUniqueSessionId(),
    userId,
    expirationTime,
  });

  await newsession.save();
  return newsession.sessionId;
}

async function verifySession(sessionId) {
    const Session = await session.findOne({
      sessionId,
      expirationTime: { $gt: new Date() }, 
    });
    return Session ? Session.userId : null;
  }

  async function cleanupExpiredSessions() {
    await session.deleteMany({ expirationTime: { $lt: new Date() } });
  }
  
  mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB2');
      cleanupExpiredSessions(); 
    })
    .catch(err => console.error('MongoDB connection error:', err));
  
    module.exports= session;