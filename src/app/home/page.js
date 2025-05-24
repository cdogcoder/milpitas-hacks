'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <div className="welcome-container">
        <div className="text-section">
          <h1 className="name"><Image src="/home/smartdeploy.png" alt="Name" width={600} height={700} /></h1>
          <p className="subtitle">CREATING SMART MANAGEMENT SYSTEMS FOR FIRST RESPONDERS SAVING LIVES</p>
          <button className="dashboard-button" onClick={() => router.push('/dashboard')}>
            DASHBOARD
          </button>
        </div>

        <div className="phone-preview">
          {/* Replace this with your image later */}
          <div className="phone-placeholder">
            <Image src="/home/phone.png" alt="Phone Preview" width={700} height={700} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --accent-red: #e10600;
        }

        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #EBEAEE;
          color: #000;
        }

        .welcome-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 6rem;
          min-height: 100vh;
        }

        .text-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .name {
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: 0.1rem;
          font: HK
        }

        .subtitle {
          font-size: 1rem;
          letter-spacing: 0.15rem;
          line-height: 1.8;
        }

        .dashboard-button {
          padding: 0.8rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          border: 2px solid var(--accent-red);
          background-color: transparent;
          border-radius: 8px;
          color: black;
          letter-spacing: 0.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .dashboard-button:hover {
          background-color: var(--accent-red);
          color: white;
        }

        .phone-preview {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-placeholder {
          width: 320px;
          height: 650px;
          background-color: #000;
          border-radius: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
        }

        @media (max-width: 900px) {
          .welcome-container {
            flex-direction: column;
            padding: 2rem;
            text-align: center;
          }

          .phone-preview {
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}