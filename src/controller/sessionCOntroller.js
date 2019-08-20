import sessionModal from '../model/sessions';

class sessionController {
  static createSession(req, res) {
    if (req.user.userType === 'user') {
      const {
        mentorId, questions,
      } = req.body;
      const sessionId = sessionModal.length + 1;
      // eslint-disable-next-line no-undef
      const newSession = {
        id: sessionId, mentorId, menteeId: req.user.id, questions, menteeEmail: req.user.email, status: 'pending',
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

  static sessionAccept(req, res) {
    if (req.user.userType === 'mentor') {
      const { sessionId } = req.params;
      // eslint-disable-next-line radix
      const foundSession = sessionModal.find(ssn => ssn.sessionId === parseInt(sessionId));
      const updatedSession = {
        id: foundSession.id, mentorId: foundSession.menteeId, menteeId: foundSession.menteeId, questions: foundSession.questions, status: 'accepted',
      };
      sessionModal[sessionModal.indexOf(foundSession)] = updatedSession;
      return res.status(200).json({
        status: 200,
        data: updatedSession,
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Only mentors are allowed',
    });
  }
}

export default sessionController;
