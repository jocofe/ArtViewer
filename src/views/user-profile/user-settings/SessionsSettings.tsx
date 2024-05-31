import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContextProvider";
import { UserSessions } from "../../../models/userSessions";
import { closeSession, getUserLoginSessions } from "../../../components/Services/sessions";
import { parseUserAgent } from "../../../components/Services/userAgentParser";
import { useClearsMessage } from "../../../hooks/useClearMessage";

export const SessionsSettings = () => {
  const { userData } = useContext(UserContext);
  const [sessions, setSessions] = useState<UserSessions[]>([]);
  const { message, setMessage } = useClearsMessage();
  
  useEffect(() => {
    const fetchSessions = async () => {
      if (userData?.email) {
        try {
          const sessionsData = await getUserLoginSessions(userData.email);
          setSessions(sessionsData);
        } catch (error) {
          console.error('Error fetching sessions', error);
        }
      }
    };

    fetchSessions();
  }, [userData]);

  const handleCloseSession = async (sessionId: string) => {
    setMessage('');
    if (userData?.email) {
      try {
        await closeSession(userData.email, sessionId);
        // Actualiza la lista de sesiones después de revocar la sesión
        const updatedSessions = sessions.filter(session => session.id !== sessionId);
        setSessions(updatedSessions);
        setMessage('Session closed succesfully')
      } catch (error) {
        console.error('Error revoking session', error);
        setMessage('Unable to close session')
      }
    }
  };

  return (
  <div className="settings">
    <p>Your sessions</p>
    <hr className="settings-hr"/>
    <p className="sessions-text">This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</p>
    
    <p>Devices</p>
    <hr className="settings-hr"/>
    <div>
      {sessions.length > 0 ? (
        sessions.map((session, index) => (
          <div key={index}>
            <div className="sessions-devices">
            <div className="sessions-devices__list">
              <p><strong>IP Address:</strong> {session.ipAddres}</p>
              <p><strong>{parseUserAgent(session.userAgent).browser} on {parseUserAgent(session.userAgent).operatingSystem}</strong></p>
              <p><strong>Last Access:</strong>{session.lastAccess.toLocaleString()}</p>
              <p><strong>Login Date:</strong> {session.loginTime.toLocaleString()}</p>
            </div>
            <div className="sessions-devices__close">
            {/* Agrega un botón o enlace para revocar la sesión */}
              <button onClick={() => handleCloseSession(session.id)} className="sessions-btn">Close Session</button>
            </div>
            </div>
            <hr className="sessions-hr" />
          </div>
        ))
      ) : (
      <p>No sessions founded</p>
    )}
    {message && <p>{message}</p>}
    </div>
  </div>
  );
};
