import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContextProvider';
import { UserSessionsProps } from '../../../models/userSessions';
import { closeSession, getUserLoginSessions } from '../../../components/Services/sessions';
import { parseUserAgent } from '../../../components/Services/userAgentParser';
import { useClearsMessage } from '../../../hooks/useClearMessage';
import { auth } from '../../../config/config';
import { useNavigate } from 'react-router-dom';

export const SessionsSettings = () => {
  const { userData } = useContext(UserContext);
  const { message, setMessage } = useClearsMessage();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<UserSessionsProps[]>([]);

  // Filter sessions by IP
  const filterLatestSessionsByIP = (sessions: UserSessionsProps[]): UserSessionsProps[] => {
    const sessionsMap: Record<string, UserSessionsProps> = sessions.reduce(
      (acc, session) => {
        const existingSession = acc[session.ipAddress];
        if (!existingSession || session.loginTime > existingSession.loginTime) {
          acc[session.ipAddress] = session;
        }
        return acc;
      },
      {} as Record<string, UserSessionsProps>,
    );
    return Object.values(sessionsMap);
  };

  useEffect(() => {
    const fetchSessions = async () => {
      if (userData?.email) {
        try {
          const sessionsData = await getUserLoginSessions(userData.email);
          const filterSessions = filterLatestSessionsByIP(sessionsData);
          setSessions(filterSessions);
        } catch (error) {
          console.error('Error fetching sessions', error);
        }
      }
    };

    fetchSessions();
  }, [userData]);

  const handleCloseSession = async (sessionId: string, sessionIpAddress: string) => {
    setMessage('');
    if (userData?.email) {
      try {
        sessionStorage.setItem('sessionIpAddress', sessionIpAddress);
        const activeSessionIpAddress = sessionStorage.getItem('sessionIpAddress');
        const isCurrentSession = activeSessionIpAddress === sessionIpAddress;
        
        if (isCurrentSession && auth) {
          // Verifica si 'auth' existe
          await auth.signOut(); // Utiliza 'auth.signOut()' para cerrar la sesión
          navigate('/');
          return;
        }

        await closeSession(userData.email, sessionId);
        const updatedSessions = sessions.filter(session => session.id !== sessionId);
        setSessions(updatedSessions);
        setMessage('Session closed successfully');
      } catch (error) {
        console.error('Error revoking session', error);
        setMessage('Unable to close session');
      }
    }
  };

  return (
    <div className="settings">
      <p>Your sessions</p>
      <hr className="sessions-hr" />
      <p className="sessions-text">
        This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.
      </p>

      <p>Devices</p>
      <hr className="sessions-hr" />
      <div className="sessions-list">
        {sessions.length > 0 ? (
          sessions.map((session, index) => (
            <div key={index}>
              <div className="sessions-devices">
                <div className="sessions-devices__list">
                  <p>
                    <strong>IP Address:</strong> {session.ipAddress}
                  </p>
                  <p>
                    <strong>
                      {parseUserAgent(session.userAgent).browser} on {parseUserAgent(session.userAgent).operatingSystem}
                    </strong>
                  </p>
                  <p>
                    <strong>Last Access:</strong>
                    {session.lastAccess.toLocaleString()}
                  </p>
                  <p>
                    <strong>Login Date:</strong> {session.loginTime.toLocaleString()}
                  </p>
                </div>
                <div className="sessions-devices__close">
                  {/* Agrega un botón o enlace para revocar la sesión */}
                  <button onClick={() => handleCloseSession(session.id, session.ipAddress)} className="sessions-btn">
                    Close Session
                  </button>
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
