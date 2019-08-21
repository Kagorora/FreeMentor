import sessionModal from '../model/sessions';

class sessionController {
  static createSession(req, res) {
    if (req.user.userType === 'user') {
      const {
        mentorId, questions,
      } = req.body;
      const sId = sessionModal.length + 1;
      // eslint-disable-next-line no-undef
      const newSession = {
        id: sId, mentorId, menteeId: req.user.id, questions, menteeEmail: req.user.email, status: 'pending',
      };
      // eslint-disable-next-line no-undef
      sessionModal.push(newSession.value);
      return res.status(201).json({
        status: 201,
        data: newSession,
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Only users can create mentorShip session',
    });
  }

  static acceptSession(req, res) {
    if (req.user.userType === 'mentor') {
      const { sessionId } = req.params;
      // eslint-disable-next-line radix
      const foundSession = sessionModal.find(s => s.sessionId === parseInt(sessionId));
      if (req.user.id === foundSession.mentorId) {
        const updatedSession = {
          sessionId: foundSession.sessionId, mentorId: foundSession.mentorId, menteeId: foundSession.menteeId, questions: foundSession.questions, menteeEmail: foundSession.menteeEmail, status: 'accepted',
        };
        sessionModal[sessionModal.indexOf(foundSession)] = updatedSession;
        return res.status(200).json({
          status: 200,
          message: 'session accepted',
          data: updatedSession,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized operation',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized access',
    });
  }
}

export default sessionController;
