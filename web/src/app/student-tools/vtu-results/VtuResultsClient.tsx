'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculatorData } from '@/data/calculatorData';

interface StudentInfo {
  name: string;
  usn: string;
  branch: string;
  batch: string;
}

interface SubjectResult {
  subject_code: string;
  subject_name: string;
  internal: string;
  external: string;
  total: string;
  result: string;
  grade: string;
}

interface SemesterData {
  [semester: string]: SubjectResult[];
}

interface VTUResultPayload {
  success: boolean;
  source: 'cache' | 'scrape';
  data: {
    student: StudentInfo;
    semesters: SemesterData;
  };
}

interface HistoryItem {
  usn: string;
  name: string;
  branch: string;
  date: string;
}

// Helper to guess subject credits based on VTU subject code conventions
function guessSubjectCredits(code: string): number {
  const c = code.toUpperCase();
  // Non-credit courses
  if (c.includes('NSS') || c.includes('PE') || c.includes('YOGA') || c.endsWith('59') || c.includes('BNSK')) {
    return 0;
  }
  // Lab courses (usually have L as the 6th/7th character or end with L + digits)
  if (/L\d+$/.test(c) || c.includes('LAB') || /L[0-9]/.test(c)) {
    return 1;
  }
  // Soft skills / Language / Constitution / Design Thinking / Health (1 credit)
  if (
    c.includes('KSK') ||
    c.includes('KBK') ||
    c.includes('ENG') ||
    c.includes('ICO') ||
    c.includes('IDT') ||
    c.includes('SFH') ||
    c.includes('UHV') ||
    c.includes('CIV') ||
    c.includes('SKS') ||
    c.includes('DTL')
  ) {
    return 1;
  }
  // Project / Mini-projects (2 credits)
  if (c.includes('PRJ') || c.includes('PROJ') || c.includes('MINI') || c.includes('MP') || c.endsWith('85') || c.endsWith('86')) {
    return 2;
  }
  // Standard theory subjects (usually 3 or 4 credits)
  // Let's assume math and key subjects starting with MATE or standard core are 4 credits, others 3
  if (c.includes('MAT') || c.includes('MATE') || c.endsWith('01') || c.endsWith('02')) {
    return 4;
  }
  return 3;
}

// Helper to match wildcard codes
function matchWildcardCode(subCode: string, targetCode: string): boolean {
  const s = subCode.toUpperCase().trim();
  const t = targetCode.toUpperCase().trim();
  
  if (s === t) return true;
  
  if (s.includes('/')) {
    const parts = s.split('/');
    return parts.some(part => matchWildcardCode(part, t));
  }
  
  const escaped = s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regexStr = '^' + escaped.replace(/X/g, '[A-Z0-9]?') + '$';
  const regex = new RegExp(regexStr);
  return regex.test(t);
}

// Helper to look up subject credits in calculatorData
function lookupSubjectCredits(code: string): number | null {
  const cleanCode = code.toUpperCase().trim();
  if (!cleanCode) return null;

  for (const scheme in calculatorData) {
    const branches = calculatorData[scheme];
    for (const branch in branches) {
      const sems = branches[branch];
      for (const sem in sems) {
        const subjects = sems[sem];
        for (const sub of subjects) {
          if (matchWildcardCode(sub.code, cleanCode)) {
            return sub.credits;
          }
        }
      }
    }
  }

  return null;
}

// Main credit getter with fallback
function getSubjectCredits(code: string): number {
  const lookup = lookupSubjectCredits(code);
  if (lookup !== null) {
    return lookup;
  }
  return guessSubjectCredits(code);
}

// Helper to derive grades from total marks for CBCS schemes
function deriveGradeFromTotal(total: number, year: number): { grade: string; points: number } {
  if (total < 40) {
    return { grade: 'F', points: 0 };
  }

  if (year >= 18) {
    // 2018, 2021, and 2022 schemes
    if (total >= 90) return { grade: 'O', points: 10 };
    if (total >= 80) return { grade: 'A+', points: 9 };
    if (total >= 70) return { grade: 'A', points: 8 };
    if (total >= 60) return { grade: 'B+', points: 7 };
    if (total >= 55) return { grade: 'B', points: 6 };
    if (total >= 50) return { grade: 'C', points: 5 };
    return { grade: 'P', points: 4 };
  } else {
    // 2015 and 2017 schemes
    if (total >= 90) return { grade: 'S+', points: 10 };
    if (total >= 80) return { grade: 'S', points: 9 };
    if (total >= 70) return { grade: 'A', points: 8 };
    if (total >= 60) return { grade: 'B', points: 7 };
    if (total >= 50) return { grade: 'C', points: 6 };
    if (total >= 45) return { grade: 'D', points: 5 };
    return { grade: 'E', points: 4 };
  }
}

// Convert VTU grades to grade points or derive them if the grade field is invalid/broken
function getGradeAndPointsForSubject(sub: SubjectResult, usn: string): { grade: string; points: number } {
  // If result indicates failure, it's always F and 0 points
  if (sub.result && sub.result.toUpperCase() === 'F') {
    return { grade: 'F', points: 0 };
  }
  
  // If result indicates absent
  if (sub.result && (sub.result.toUpperCase() === 'A' || sub.result.toUpperCase() === 'AB')) {
    return { grade: 'AB', points: 0 };
  }

  // Extract admission year from USN (characters 3 and 4)
  let year = 22; // default fallback to 2022 scheme
  if (usn && usn.length >= 5) {
    const yearStr = usn.substring(3, 5);
    const parsedYear = parseInt(yearStr);
    if (!isNaN(parsedYear)) {
      year = parsedYear;
    }
  }

  const rawGrade = sub.grade ? sub.grade.toUpperCase().trim() : '';
  const validGrades = ['O', 'S+', 'S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'E', 'P', 'F', 'AB', 'W'];
  
  const totalMarks = parseInt(sub.total);
  const parsedTotal = isNaN(totalMarks) ? 0 : totalMarks;

  // If grade is absent, invalid, or is a date-prefix (like "2026-"), compute from total marks
  if (!rawGrade || !validGrades.includes(rawGrade) || rawGrade.includes('-') || /^\d/.test(rawGrade)) {
    return deriveGradeFromTotal(parsedTotal, year);
  }

  // If the grade is valid, map it to points using scheme-aware logic
  let points = 0;
  if (rawGrade === 'F' || rawGrade === 'AB' || rawGrade === 'W') {
    points = 0;
  } else if (year >= 18) {
    // 2018, 2021, 2022 schemes
    switch (rawGrade) {
      case 'O':
        points = 10;
        break;
      case 'A+':
        points = 9;
        break;
      case 'A':
        points = 8;
        break;
      case 'B+':
        points = 7;
        break;
      case 'B':
        points = 6;
        break;
      case 'C':
        points = 5;
        break;
      case 'P':
        points = 4;
        break;
      default:
        return deriveGradeFromTotal(parsedTotal, year);
    }
  } else {
    // 2015, 2017 schemes
    switch (rawGrade) {
      case 'S+':
        points = 10;
        break;
      case 'S':
        points = 9;
        break;
      case 'A':
        points = 8;
        break;
      case 'B':
        points = 7;
        break;
      case 'C':
        points = 6;
        break;
      case 'D':
        points = 5;
        break;
      case 'E':
        points = 4;
        break;
      default:
        return deriveGradeFromTotal(parsedTotal, year);
    }
  }

  return { grade: rawGrade, points };
}

export default function VtuResultsClient() {
  const [usn, setUsn] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [requireCaptcha, setRequireCaptcha] = useState(false);
  const [captchaImg, setCaptchaImg] = useState('');
  const [captchaVal, setCaptchaVal] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<VTUResultPayload | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedSems, setExpandedSems] = useState<string[]>([]);
  const [subjectSearch, setSubjectSearch] = useState('');
  
  const [scrapeToken, setScrapeToken] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [indexPage, setIndexPage] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState('D5J6');

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vtuwise_result_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing history', e);
      }
    }
  }, []);

  // Save history helper
  const addToHistory = (student: StudentInfo) => {
    const item: HistoryItem = {
      usn: student.usn,
      name: student.name,
      branch: student.branch || 'VTU Student',
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    };
    
    // Remove duplicates
    const filtered = history.filter(h => h.usn.toUpperCase() !== student.usn.toUpperCase());
    const updated = [item, ...filtered].slice(0, 5); // Keep last 5
    
    setHistory(updated);
    localStorage.setItem('vtuwise_result_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('vtuwise_result_history');
  };

  const validateUsn = (val: string) => {
    // Standard VTU USN format: e.g. 1RV21CS001
    return /^[1-4][A-Z]{2}\d{2}[A-Z]{2}\d{3}$/i.test(val);
  };

  const handleUsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsn(e.target.value.toUpperCase());
  };

  // Step 1: Check database (Cache lookups)
  const handleInitialSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUsn(usn)) {
      setError('Please enter a valid 10-character USN (e.g. 1RV21CS001).');
      return;
    }

    setError(null);
    setIsChecking(true);
    setRequireCaptcha(false);
    setResultData(null);

    try {
      const res = await fetch(`/api/student-tools/vtu-results/check?usn=${usn}`);
      const data = await res.json();

      if (data.success && data.data) {
        // Cached result found
        setResultData({
          success: true,
          source: 'cache',
          data: data.data
        });
        addToHistory(data.data.student);
        // Expand the latest semester by default
        const sems = Object.keys(data.data.semesters).sort((a, b) => Number(b) - Number(a));
        if (sems.length > 0) {
          setExpandedSems([sems[0]]);
        }
      } else {
        // Result not in cache, load captcha
        await fetchCaptcha();
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to check results database. Please check your network connection.');
    } finally {
      setIsChecking(false);
    }
  };

  // Step 2: Fetch Captcha from API
  const fetchCaptcha = async (cycle?: string, keepError = false) => {
    if (!keepError) {
      setError(null);
    }
    setCaptchaImg('');
    setCaptchaVal('');
    setIsFetching(true);
    try {
      const url = cycle ? `/api/student-tools/vtu-results/captcha?cycle=${cycle}` : '/api/student-tools/vtu-results/captcha';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.captcha_image) {
        setCaptchaImg(data.captcha_image);
        setScrapeToken(data.token || '');
        setSessionId(data.sessionId || '');
        setIndexPage(data.indexPage || '');
        setRequireCaptcha(true);
        setCaptchaVal('');
      } else {
        throw new Error(data.error || 'Failed to generate CAPTCHA');
      }
    } catch (err: any) {
      setError(`Unable to initiate VTU live portal. Error: ${err.message || 'Server down'}`);
    } finally {
      setIsFetching(false);
    }
  };

  // Step 3: Submit Captcha and Scrape Live Result
  const handleCaptchaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVal.trim()) {
      setError('Please enter the CAPTCHA code.');
      return;
    }

    setError(null);
    setIsFetching(true);

    try {
      const res = await fetch('/api/student-tools/vtu-results/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usn, captcha: captchaVal, token: scrapeToken, sessionId, indexPage })
      });
      const data = await res.json();

      if (data.success && data.data) {
        // Merge Semesters if same USN, else overwrite
        setResultData(prev => {
          if (prev && prev.data.student.usn.toUpperCase() === data.data.student.usn.toUpperCase()) {
            const mergedSemesters = { ...prev.data.semesters, ...data.data.semesters };
            return {
              ...prev,
              source: 'scrape',
              data: {
                ...prev.data,
                semesters: mergedSemesters
              }
            };
          }
          return {
            success: true,
            source: 'scrape',
            data: data.data
          };
        });

        addToHistory(data.data.student);
        setRequireCaptcha(false);
        setImportModalOpen(false);

        // Expand the newly imported semester
        const newSems = Object.keys(data.data.semesters);
        if (newSems.length > 0) {
          setExpandedSems(prev => Array.from(new Set([...prev, ...newSems])));
        }
      } else {
        // If fail, reload captcha but preserve error message
        const errMsg = data.message || data.error || 'Verification failed. Please enter the captcha code again.';
        setError(errMsg);
        await fetchCaptcha(importModalOpen ? selectedCycle : undefined, true);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch live result from VTU. Please try again.');
    } finally {
      setIsFetching(false);
    }
  };

  const toggleSemester = (sem: string) => {
    if (expandedSems.includes(sem)) {
      setExpandedSems(expandedSems.filter(s => s !== sem));
    } else {
      setExpandedSems([...expandedSems, sem]);
    }
  };

  // Calculations for dashboard
  const calculateSemSGPA = (subjects: SubjectResult[]) => {
    let totalCredits = 0;
    let earnedPoints = 0;
    let hasBacklog = false;

    subjects.forEach(sub => {
      const credits = getSubjectCredits(sub.subject_code);
      const { grade, points } = getGradeAndPointsForSubject(sub, resultData?.data?.student?.usn || usn);
      
      if (sub.result.toUpperCase() === 'F' || grade === 'F') {
        hasBacklog = true;
      }

      totalCredits += credits;
      earnedPoints += (credits * points);
    });

    if (totalCredits === 0) return { sgpa: 0, credits: 0, hasBacklog };
    return {
      sgpa: parseFloat((earnedPoints / totalCredits).toFixed(2)),
      credits: totalCredits,
      hasBacklog
    };
  };

  const calculateOverallStats = () => {
    if (!resultData) return { cgpa: 0, totalCredits: 0, backlogs: 0, semsData: [] as {sem: string, sgpa: number}[] };
    
    let totalEarnedPoints = 0;
    let totalCredits = 0;
    let backlogs = 0;
    const semsData: {sem: string, sgpa: number}[] = [];

    const sortedSems = Object.keys(resultData.data.semesters).sort((a, b) => Number(a) - Number(b));

    sortedSems.forEach(sem => {
      const subjects = resultData.data.semesters[sem];
      let semEarnedPoints = 0;
      let semCredits = 0;

      subjects.forEach(sub => {
        const credits = getSubjectCredits(sub.subject_code);
        const { grade, points } = getGradeAndPointsForSubject(sub, resultData.data.student.usn);
        
        if (sub.result.toUpperCase() === 'F' || grade === 'F') {
          backlogs++;
        }
        
        semCredits += credits;
        semEarnedPoints += (credits * points);
      });

      const sgpa = semCredits > 0 ? parseFloat((semEarnedPoints / semCredits).toFixed(2)) : 0;
      semsData.push({ sem, sgpa });

      totalEarnedPoints += semEarnedPoints;
      totalCredits += semCredits;
    });

    const cgpa = totalCredits > 0 ? parseFloat((totalEarnedPoints / totalCredits).toFixed(2)) : 0;

    return {
      cgpa,
      totalCredits,
      backlogs,
      semsData: semsData.sort((a, b) => Number(a.sem) - Number(b.sem))
    };
  };

  const stats = calculateOverallStats();

  // SVG Chart path calculation helper
  const getChartPath = (data: {sem: string, sgpa: number}[]) => {
    if (data.length < 2) return '';
    const width = 500;
    const height = 150;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      // Map SGPA (0 to 10) to height coordinates (bottom to top)
      const y = padding + chartHeight - (d.sgpa / 10) * chartHeight;
      return { x, y };
    });

    // Create cubic bezier curve or straight lines
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const getChartPoints = (data: {sem: string, sgpa: number}[]) => {
    if (data.length === 0) return [];
    const width = 500;
    const height = 150;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    return data.map((d, i) => {
      const x = padding + (i / Math.max(1, data.length - 1)) * chartWidth;
      const y = padding + chartHeight - (d.sgpa / 10) * chartHeight;
      return { x, y, sem: d.sem, sgpa: d.sgpa };
    });
  };

  return (
    <div className="vtu-results-page">
      {/* Background decoration */}
      <div className="decor-orbs">
        <div className="orb orb-primary" />
        <div className="orb orb-cyan" />
      </div>
      <div className="decor-grid" />

      <div className="content-container">
        {/* Header Breadcrumbs */}
        <div className="breadcrumbs">
          <Link href="/student-tools" className="breadcrumb-link">
            &larr; Student Tools
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">VTU Results Portal</span>
        </div>

        {/* Search State */}
        {!resultData && !requireCaptcha && (
          <div className="search-section animate-fade-in">
            <div className="search-hero">
              <span className="hero-badge">🎓 Live Academic Scraper</span>
              <h1 className="hero-title">
                Check Your <span className="gradient-text">VTU Results</span>
              </h1>
              <p className="hero-desc">
                Input your University Seat Number (USN). Fast database lookups with live-scraping fallbacks.
              </p>
            </div>

            <div className="glass-card search-card">
              <form onSubmit={handleInitialSearch} className="search-form">
                <div className="input-group">
                  <label htmlFor="usnInput" className="input-label">University Seat Number (USN)</label>
                  <div className="input-row">
                    <div className="input-wrapper">
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        id="usnInput"
                        placeholder="e.g. 1RV21CS001"
                        value={usn}
                        onChange={handleUsnChange}
                        maxLength={10}
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        disabled={isChecking}
                      />
                      {usn.length > 0 && (
                        <span className={`usn-badge ${validateUsn(usn) ? 'badge-valid' : 'badge-invalid'}`}>
                          {validateUsn(usn) ? 'Valid Format' : 'Invalid'}
                        </span>
                      )}
                    </div>
                    <button type="submit" className="btn-search" disabled={isChecking || !validateUsn(usn)}>
                      {isChecking ? (
                        <span className="spinner-inline" />
                      ) : (
                        <>
                          <span>Search</span>
                          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="input-hint">Format: 1XX21CS001 (10 characters, upper case)</span>
                </div>
              </form>
            </div>

            {error && (
              <div className="error-banner animate-slide-up" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="error-icon">⚠️</span>
                  <p className="error-msg">{error}</p>
                </div>
                {(error.includes('captcha') || error.includes('portal') || error.includes('initiating') || error.includes('fetch')) && (
                  <div className="error-action-hint">
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      The upstream live-scraping service is currently offline or down.
                    </p>
                    <p style={{ margin: '0 0 0.75rem 0' }}>
                      You can still check results for already cached USNs (e.g. <code>2RV21CS054</code>). For new results, please query the official VTU portal directly:
                    </p>
                    <a
                      href="https://results.vtu.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-error-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: '#e11d48',
                        color: '#fff',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.375rem',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        transition: 'background 0.2s'
                      }}
                    >
                      Go to results.vtu.ac.in &rarr;
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* History Panel */}
            {history.length > 0 && (
              <div className="history-panel glass-card animate-fade-in-delayed">
                <div className="history-header">
                  <h3>Recent Searches</h3>
                  <button onClick={clearHistory} className="btn-clear">Clear History</button>
                </div>
                <div className="history-grid">
                  {history.map((h, i) => (
                    <div
                      key={i}
                      className="history-item"
                      onClick={() => {
                        setUsn(h.usn);
                        // Trigger search directly
                        setError(null);
                        setIsChecking(true);
                        setRequireCaptcha(false);
                        setResultData(null);
                        fetch(`/api/student-tools/vtu-results/check?usn=${h.usn}`)
                          .then(res => res.json())
                          .then(data => {
                            if (data.success && data.data) {
                              setResultData({ success: true, source: 'cache', data: data.data });
                              // Expand latest
                              const sems = Object.keys(data.data.semesters).sort((a, b) => Number(b) - Number(a));
                              if (sems.length > 0) setExpandedSems([sems[0]]);
                            } else {
                              fetchCaptcha();
                            }
                          })
                          .catch(() => setError('Failed to retrieve student data'))
                          .finally(() => setIsChecking(false));
                      }}
                    >
                      <div className="history-info">
                        <span className="history-name">{h.name}</span>
                        <span className="history-usn">{h.usn}</span>
                      </div>
                      <span className="history-branch">{h.branch.split(' ').slice(0, 3).join(' ')}</span>
                      <span className="history-date">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Captcha Verification state */}
        {requireCaptcha && (
          <div className="captcha-section animate-fade-in">
            <div className="search-hero">
              <span className="hero-badge badge-alert">⚠️ Security Verification</span>
              <h1 className="hero-title">VTU Portal Authentication</h1>
              <p className="hero-desc">
                Your results are not cached. Solve the official VTU security captcha to scrape details live.
              </p>
            </div>

            <div className="glass-card captcha-card">
              <form onSubmit={handleCaptchaSubmit} className="captcha-form">
                <div className="captcha-container">
                  <div className="captcha-image-wrapper">
                    {captchaImg ? (
                      <img src={captchaImg} alt="VTU Portal Captcha" className="captcha-img" />
                    ) : (
                      <div className="captcha-placeholder">Loading image...</div>
                    )}
                    <button type="button" onClick={() => fetchCaptcha()} className="btn-refresh" title="Reload Captcha" disabled={isFetching}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="captcha-input-group">
                    <input
                      type="text"
                      placeholder="Enter CAPTCHA Code"
                      value={captchaVal}
                      onChange={(e) => setCaptchaVal(e.target.value)}
                      maxLength={8}
                      autoComplete="off"
                      spellCheck={false}
                      disabled={isFetching}
                      required
                    />
                  </div>
                </div>

                <div className="captcha-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setRequireCaptcha(false);
                      setUsn('');
                    }}
                    disabled={isFetching}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={isFetching}>
                    {isFetching ? <span className="spinner-inline" /> : 'Fetch Live Result'}
                  </button>
                </div>
              </form>
            </div>

            {error && (
              <div className="error-banner animate-slide-up" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="error-icon">⚠️</span>
                  <p className="error-msg">{error}</p>
                </div>
                {(error.includes('captcha') || error.includes('portal') || error.includes('initiating') || error.includes('fetch')) && (
                  <div className="error-action-hint">
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      The upstream live-scraping service is currently offline or down.
                    </p>
                    <p style={{ margin: '0 0 0.75rem 0' }}>
                      You can still check results for already cached USNs (e.g. <code>2RV21CS054</code>). For new results, please query the official VTU portal directly:
                    </p>
                    <a
                      href="https://results.vtu.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-error-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: '#e11d48',
                        color: '#fff',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.375rem',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        transition: 'background 0.2s'
                      }}
                    >
                      Go to results.vtu.ac.in &rarr;
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Presentation State */}
        {resultData && (
          <div className="results-section animate-fade-in printable">
            {/* Action Toolbar */}
            <div className="toolbar no-print">
              <button
                className="btn-back"
                onClick={() => {
                  setResultData(null);
                  setUsn('');
                  setError(null);
                }}
              >
                &larr; Back to Search
              </button>
              <div className="toolbar-right" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span className={`source-tag tag-${resultData.source}`}>
                  {resultData.source === 'cache' ? '⚡ Database Cache' : '🌐 Live Scraped'}
                </span>
                <button
                  className="btn-print"
                  onClick={() => {
                    setSelectedCycle('D5J6');
                    setImportModalOpen(true);
                    fetchCaptcha('D5J6');
                  }}
                  style={{
                    background: 'var(--primary)',
                    borderColor: 'var(--primary)',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  <span>📥 Import Semester</span>
                </button>
                <button className="btn-print" onClick={() => window.print()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  <span>Export Marksheet</span>
                </button>
              </div>
            </div>

            {/* Student Profile Info */}
            <div className="student-profile glass-card">
              <div className="profile-badge">VTU Academic Record</div>
              <h2 className="student-name">{resultData.data.student.name}</h2>
              
              <div className="profile-grid">
                <div className="profile-meta">
                  <span className="meta-label">University Seat Number</span>
                  <span className="meta-val highlight-usn">{resultData.data.student.usn}</span>
                </div>
                <div className="profile-meta">
                  <span className="meta-label">Discipline / Branch</span>
                  <span className="meta-val">{resultData.data.student.branch}</span>
                </div>
                <div className="profile-meta">
                  <span className="meta-label">Admitted Batch</span>
                  <span className="meta-val">{resultData.data.student.batch || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard Grid */}
            <div className="analytics-grid">
              {/* CGPA gauge */}
              <div className="analytics-card glass-card">
                <h3>Cumulative GPA (CGPA)</h3>
                <div className="gauge-container">
                  <svg className="gauge-svg" viewBox="0 0 120 120">
                    <circle className="gauge-bg" cx="60" cy="60" r="50" />
                    <circle
                      className="gauge-progress"
                      cx="60"
                      cy="60"
                      r="50"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 50}`,
                        strokeDashoffset: `${2 * Math.PI * 50 * (1 - stats.cgpa / 10)}`
                      }}
                    />
                  </svg>
                  <div className="gauge-val">
                    <span className="num">{stats.cgpa.toFixed(2)}</span>
                    <span className="lbl">Estimated</span>
                  </div>
                </div>
                <p className="card-desc">
                  Based on weighted estimates from all {stats.semsData.length} semesters.
                </p>
              </div>

              {/* GPA line chart */}
              <div className="analytics-card glass-card span-two-mobile">
                <h3>Semester Performance Trend</h3>
                {stats.semsData.length > 1 ? (
                  <div className="chart-wrapper">
                    <svg className="chart-svg" viewBox="0 0 500 150">
                      {/* Grid Lines */}
                      {[2, 4, 6, 8, 10].map((level) => {
                        const y = 30 + 90 - (level / 10) * 90;
                        return (
                          <g key={level} className="grid-group">
                            <line className="chart-grid-line" x1="30" y1={y} x2="470" y2={y} />
                            <text className="chart-grid-text" x="15" y={y + 4}>{level}</text>
                          </g>
                        );
                      })}
                      
                      {/* X axis lines */}
                      {getChartPoints(stats.semsData).map((p, idx) => (
                        <line
                          key={idx}
                          className="chart-vertical-grid"
                          x1={p.x}
                          y1="30"
                          x2={p.x}
                          y2="120"
                        />
                      ))}

                      {/* Main Trend Line */}
                      <path className="chart-line" d={getChartPath(stats.semsData)} />
                      
                      {/* Area Fill */}
                      {(() => {
                        const path = getChartPath(stats.semsData);
                        if (!path) return null;
                        const points = getChartPoints(stats.semsData);
                        const first = points[0];
                        const last = points[points.length - 1];
                        const areaPath = `${path} L ${last.x} 120 L ${first.x} 120 Z`;
                        return <path className="chart-area" d={areaPath} />;
                      })()}

                      {/* Points */}
                      {getChartPoints(stats.semsData).map((p, idx) => (
                        <g key={idx} className="chart-point-group">
                          <circle className="chart-point-bg" cx={p.x} cy={p.y} r="8" />
                          <circle className="chart-point" cx={p.x} cy={p.y} r="4" />
                          <text className="chart-point-label" x={p.x} y={p.y - 12}>{p.sgpa.toFixed(2)}</text>
                          <text className="chart-axis-text" x={p.x} y="138">Sem {p.sem}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                ) : (
                  <div className="chart-fallback">
                    <svg viewBox="0 0 100 100" className="fallback-icon">
                      <path d="M20 80 L80 80 M30 80 L30 50 M50 80 L50 30 M70 80 L70 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                    </svg>
                    <p>Collect results from multiple semesters to unlock trend analysis dashboards.</p>
                  </div>
                )}
              </div>

              {/* Status details */}
              <div className="analytics-card glass-card">
                <h3>Academic Summary</h3>
                <div className="stats-list">
                  <div className="stat-row">
                    <span className="lbl">Semesters Cleared</span>
                    <span className="val">{stats.semsData.length}</span>
                  </div>
                  <div className="stat-row">
                    <span className="lbl">Total Estimated Credits</span>
                    <span className="val">{stats.totalCredits}</span>
                  </div>
                  <div className="stat-row">
                    <span className="lbl">Active Backlogs</span>
                    <span className={`val ${stats.backlogs > 0 ? 'color-rose' : 'color-emerald'}`}>
                      {stats.backlogs}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="lbl">Overall Pass Rate</span>
                    <span className="val">
                      {stats.totalCredits > 0
                        ? `${Math.round(((stats.totalCredits - stats.backlogs * 3) / stats.totalCredits) * 100)}%`
                        : '100%'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Semester Detailed Marksheet */}
            <div className="marksheet-section">
              <div className="marksheet-header no-print">
                <h3>Detailed Marksheet</h3>
                <div className="search-filter-wrapper">
                  <input
                    type="text"
                    placeholder="Filter subjects by code/name..."
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    className="subject-search-input"
                  />
                  {subjectSearch && (
                    <button className="clear-search" onClick={() => setSubjectSearch('')}>✕</button>
                  )}
                </div>
              </div>

              <div className="sems-accordion-list">
                {Object.keys(resultData.data.semesters)
                  .sort((a, b) => Number(b) - Number(a)) // Latest semester first
                  .map((sem) => {
                    const subjects = resultData.data.semesters[sem];
                    const semStats = calculateSemSGPA(subjects);
                    const isExpanded = expandedSems.includes(sem);
                    
                    // Filter subjects
                    const filteredSubjects = subjects.filter(
                      (sub) =>
                        sub.subject_code.toLowerCase().includes(subjectSearch.toLowerCase()) ||
                        sub.subject_name.toLowerCase().includes(subjectSearch.toLowerCase())
                    );

                    if (filteredSubjects.length === 0 && subjectSearch !== '') {
                      return null; // Hide semester if search filters all subjects
                    }

                    return (
                      <div key={sem} className={`sem-accordion-card glass-card ${isExpanded ? 'expanded' : ''}`}>
                        <div className="accordion-trigger" onClick={() => toggleSemester(sem)}>
                          <div className="trigger-left">
                            <span className="accordion-arrow">▼</span>
                            <h4>Semester {sem}</h4>
                          </div>
                          
                          <div className="trigger-right">
                            <span className="sem-summary-badge">
                              Credits: <strong>{semStats.credits}</strong>
                            </span>
                            <span className={`sem-summary-badge ${semStats.hasBacklog ? 'badge-rose' : 'badge-emerald'}`}>
                              SGPA: <strong>{semStats.sgpa.toFixed(2)}</strong>
                            </span>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="accordion-content">
                            <div className="table-responsive">
                              <table className="marks-table">
                                <thead>
                                  <tr>
                                    <th>Code</th>
                                    <th>Subject Name</th>
                                    <th>Credits</th>
                                    <th className="text-center">Internal</th>
                                    <th className="text-center">External</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Grade</th>
                                    <th className="text-center">Result</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredSubjects.map((sub, idx) => {
                                    const { grade } = getGradeAndPointsForSubject(sub, resultData?.data?.student?.usn || usn);
                                    const isFail = sub.result.toUpperCase() === 'F' || grade === 'F';
                                    const isAbsent = sub.result.toUpperCase() === 'A' || grade === 'AB';
                                    const credits = getSubjectCredits(sub.subject_code);
                                    
                                    return (
                                      <tr key={idx} className={isFail ? 'row-failed' : ''}>
                                        <td className="font-mono text-sm font-semibold">{sub.subject_code}</td>
                                        <td className="subject-name-cell">{sub.subject_name}</td>
                                        <td className="text-center font-semibold text-muted">{credits || '-'}</td>
                                        <td className="text-center">{sub.internal || '0'}</td>
                                        <td className="text-center">{sub.external || '0'}</td>
                                        <td className="text-center font-bold">{sub.total || '0'}</td>
                                        <td className="text-center">
                                          <span className={`grade-badge grade-${grade.toUpperCase()}`}>
                                            {grade}
                                          </span>
                                        </td>
                                        <td className="text-center">
                                          <span className={`result-badge status-${sub.result.toUpperCase()}`}>
                                            {isFail ? 'FAIL' : isAbsent ? 'ABSENT' : 'PASS'}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {importModalOpen && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}>
            <div className="modal-content glass-card animate-scale-in" style={{
              width: '90%',
              maxWidth: '450px',
              padding: '2rem',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>
                Import Previous Semesters
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                Select an exam cycle to scrape results for your other semesters. The parsed marks will be added to your current dashboard.
              </p>
              
              <form onSubmit={handleCaptchaSubmit}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    Exam Cycle
                  </label>
                  <select
                    value={selectedCycle}
                    onChange={(e) => {
                      setSelectedCycle(e.target.value);
                      fetchCaptcha(e.target.value);
                    }}
                    style={{
                      width: '100%',
                      background: 'var(--surface)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      color: 'var(--text)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="MJ26" style={{ background: 'var(--surface)', color: 'var(--text)' }}>May/June 2026 (Sem 6/etc)</option>
                    <option value="D5J6" style={{ background: 'var(--surface)', color: 'var(--text)' }}>Dec 2025 / Jan 2026 (Sem 5/etc)</option>
                    <option value="JJ25" style={{ background: 'var(--surface)', color: 'var(--text)' }}>June / July 2025 (Sem 4/etc)</option>
                    <option value="D4J5" style={{ background: 'var(--surface)', color: 'var(--text)' }}>Dec 2024 / Jan 2025 (Sem 3/etc)</option>
                    <option value="JJ24" style={{ background: 'var(--surface)', color: 'var(--text)' }}>June / July 2024 (Sem 2/etc)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    Security CAPTCHA
                  </label>
                  <div className="captcha-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--surface-border)', marginBottom: '0.75rem' }}>
                    {captchaImg ? (
                      <img src={captchaImg} alt="CAPTCHA" style={{ height: '40px', borderRadius: '0.375rem' }} />
                    ) : (
                      <div className="captcha-loader" style={{ height: '40px', width: '120px', background: 'rgba(0,0,0,0.05)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="spinner-inline" />
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn-refresh"
                      onClick={() => fetchCaptcha(selectedCycle)}
                      disabled={isFetching}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '1.25rem'
                      }}
                    >
                      🔄
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaVal}
                    onChange={(e) => setCaptchaVal(e.target.value)}
                    placeholder="Enter CAPTCHA Code"
                    className="input-field"
                    style={{
                      width: '100%',
                      background: 'var(--surface)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      color: 'var(--text)',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em'
                    }}
                    required
                  />
                </div>

                {error && (
                  <div className="error-banner" style={{ padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.25rem' }}>
                    <p className="error-msg" style={{ fontSize: '0.8rem', margin: 0 }}>{error}</p>
                  </div>
                )}

                <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setImportModalOpen(false);
                      setError(null);
                    }}
                    style={{
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--surface-border)',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isFetching}
                    style={{
                      background: 'var(--primary)',
                      color: '#fff',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    {isFetching ? <span className="spinner-inline" /> : 'Import'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .vtu-results-page {
          background: var(--background);
          min-height: 95vh;
          position: relative;
          overflow: hidden;
          padding: 2rem 1.5rem 6rem;
          color: var(--text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* ═════════ DECORATIONS ═════════ */
        .decor-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 0;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
        }
        .orb-primary {
          width: 500px;
          height: 500px;
          background: #4f46e5;
          top: -100px;
          right: -100px;
        }
        .orb-cyan {
          width: 400px;
          height: 400px;
          background: #06b6d4;
          bottom: -100px;
          left: -100px;
        }
        .decor-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }
        [data-theme="dark"] .decor-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .content-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ═════════ BREADCRUMBS ═════════ */
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }
        .breadcrumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-link:hover {
          color: var(--primary);
        }
        .breadcrumb-separator {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .breadcrumb-current {
          color: var(--text);
          font-weight: 600;
        }

        /* ═════════ GLASS CARD ═════════ */
        .glass-card {
          background: var(--glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          transition: border-color 0.3s, transform 0.3s;
        }

        /* ═════════ SEARCH SECTION ═════════ */
        .search-hero {
          text-align: center;
          margin-bottom: 3rem;
        }
        .hero-badge {
          background: rgba(79, 70, 229, 0.08);
          color: var(--primary);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(79, 70, 229, 0.15);
          display: inline-block;
          margin-bottom: 1.25rem;
        }
        [data-theme="dark"] .hero-badge {
          background: rgba(79, 70, 229, 0.1);
          color: #a5b4fc;
          border-color: rgba(165, 180, 252, 0.2);
        }
        .hero-badge.badge-alert {
          background: rgba(244, 63, 94, 0.08);
          color: #e11d48;
          border-color: rgba(244, 63, 94, 0.15);
        }
        [data-theme="dark"] .hero-badge.badge-alert {
          background: rgba(244, 63, 94, 0.1);
          color: #fca5a5;
          border-color: rgba(244, 63, 94, 0.2);
        }
        .hero-title {
          font-size: clamp(2rem, 6vw, 3.2rem);
          font-weight: 900;
          color: var(--text);
          margin-bottom: 1rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }
        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .search-card {
          max-width: 650px;
          margin: 0 auto 3rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .input-label {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        .input-row {
          display: flex;
          gap: 1rem;
        }
        .input-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 1.25rem;
          width: 20px;
          height: 20px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          padding: 1.1rem 1rem 1.1rem 3.2rem;
          color: var(--text);
          font-family: inherit;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        [data-theme="dark"] .input-wrapper input {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .usn-badge {
          position: absolute;
          right: 1rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.25rem 0.6rem;
          border-radius: 0.5rem;
        }
        .badge-valid {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .badge-invalid {
          background: rgba(244, 63, 94, 0.1);
          color: #f87171;
          border: 1px solid rgba(244, 63, 94, 0.2);
        }
        .btn-search {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          border: none;
          border-radius: 1rem;
          padding: 0 1.8rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.3s, transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        .btn-search:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        }
        .btn-search:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }
        .arrow-icon {
          width: 16px;
          height: 16px;
        }
        .input-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
          opacity: 0.8;
        }

        /* ═════════ ERROR BOX ═════════ */
        .error-banner {
          max-width: 650px;
          margin: 0 auto 2rem;
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid rgba(244, 63, 94, 0.15);
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        [data-theme="dark"] .error-banner {
          background: rgba(244, 63, 94, 0.1);
          border-color: rgba(244, 63, 94, 0.2);
        }
        .error-icon {
          font-size: 1.2rem;
        }
        .error-msg {
          font-size: 0.92rem;
          font-weight: 600;
          color: #e11d48;
        }
        [data-theme="dark"] .error-msg {
          color: #fca5a5;
        }
        .error-action-hint {
          margin-top: 0.75rem;
          border-top: 1px solid rgba(244, 63, 94, 0.15);
          padding-top: 0.75rem;
          font-size: 0.85rem;
          color: #b91c1c;
        }
        [data-theme="dark"] .error-action-hint {
          color: #fca5a5;
        }

        /* ═════════ RECENT HISTORY ═════════ */
        .history-panel {
          max-width: 650px;
          margin: 0 auto;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .history-header h3 {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .btn-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-clear:hover {
          color: var(--primary);
        }
        .history-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .history-item {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        [data-theme="dark"] .history-item {
          background: rgba(15, 23, 42, 0.3);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .history-item:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(99, 102, 241, 0.3);
        }
        [data-theme="dark"] .history-item:hover {
          background: rgba(15, 23, 42, 0.6);
        }
        .history-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .history-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
        }
        .history-usn {
          font-family: monospace;
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .history-branch {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .history-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          opacity: 0.7;
        }

        /* ═════════ CAPTCHA PANEL ═════════ */
        .captcha-card {
          max-width: 500px;
          margin: 0 auto;
        }
        .captcha-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .captcha-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .captcha-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 1rem;
          padding: 1rem;
          position: relative;
          min-height: 80px;
        }
        [data-theme="dark"] .captcha-image-wrapper {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(255, 255, 255, 0.08);
        }
        .captcha-img {
          max-height: 60px;
          object-fit: contain;
          border-radius: 0.5rem;
        }
        .captcha-placeholder {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .btn-refresh {
          position: absolute;
          right: 1rem;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--text);
          border-radius: 0.5rem;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        [data-theme="dark"] .btn-refresh {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .btn-refresh:hover {
          background: rgba(0, 0, 0, 0.06);
        }
        [data-theme="dark"] .btn-refresh:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .btn-refresh svg {
          width: 16px;
          height: 16px;
        }
        .captcha-input-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.75rem;
          padding: 0.9rem;
          color: var(--text);
          font-size: 1.1rem;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.2em;
          transition: border-color 0.3s;
        }
        [data-theme="dark"] .captcha-input-group input {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .captcha-input-group input:focus {
          outline: none;
          border-color: var(--primary);
        }
        .captcha-actions {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.9rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-secondary {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--text);
          border-radius: 0.75rem;
          padding: 0.9rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        [data-theme="dark"] .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .btn-secondary:hover {
          background: rgba(0, 0, 0, 0.06);
        }
        [data-theme="dark"] .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* ═════════ RESULTS VIEW ═════════ */
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .btn-back {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .btn-back:hover {
          color: var(--text);
        }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .source-tag {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.75rem;
          border-radius: 2rem;
        }
        .tag-cache {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        [data-theme="dark"] .tag-cache {
          color: #34d399;
        }
        .tag-scrape {
          background: rgba(6, 182, 212, 0.1);
          color: #0891b2;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }
        [data-theme="dark"] .tag-scrape {
          color: #22d3ee;
        }
        .btn-print {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--text);
          padding: 0.55rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }
        [data-theme="dark"] .btn-print {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .btn-print:hover {
          background: rgba(0, 0, 0, 0.06);
        }
        [data-theme="dark"] .btn-print:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .btn-print svg {
          width: 16px;
          height: 16px;
        }

        .student-profile {
          margin-bottom: 2rem;
          position: relative;
        }
        .profile-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
        }
        .student-name {
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--text);
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          border-top: 1px solid var(--surface-border);
          padding-top: 1.5rem;
        }
        .profile-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .meta-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        .meta-val {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
        }
        .highlight-usn {
          font-family: monospace;
          color: var(--primary);
          letter-spacing: 0.05em;
        }
        [data-theme="dark"] .highlight-usn {
          color: #a5b4fc;
        }

        /* ═════════ ANALYTICS GRID ═════════ */
        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .analytics-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.75rem;
        }
        .analytics-card h3 {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          align-self: flex-start;
          text-transform: uppercase;
        }
        .card-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          margin-top: 1rem;
          opacity: 0.8;
        }

        /* Circular progress */
        .gauge-container {
          position: relative;
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gauge-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .gauge-bg {
          fill: none;
          stroke: rgba(0, 0, 0, 0.05);
          stroke-width: 8;
        }
        [data-theme="dark"] .gauge-bg {
          stroke: rgba(255, 255, 255, 0.05);
        }
        .gauge-progress {
          fill: none;
          stroke: url(#cyan-indigo-grad);
          stroke: #6366f1;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.8s ease-in-out;
        }
        .gauge-val {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gauge-val .num {
          font-size: 1.7rem;
          font-weight: 900;
          color: var(--text);
          line-height: 1.1;
        }
        .gauge-val .lbl {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        /* SVG Chart */
        .chart-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chart-svg {
          width: 100%;
          max-height: 140px;
        }
        .chart-grid-line {
          stroke: rgba(0, 0, 0, 0.05);
          stroke-width: 1;
        }
        [data-theme="dark"] .chart-grid-line {
          stroke: rgba(255, 255, 255, 0.04);
        }
        .chart-vertical-grid {
          stroke: rgba(0, 0, 0, 0.02);
          stroke-width: 1.5;
          stroke-dasharray: 2 4;
        }
        [data-theme="dark"] .chart-vertical-grid {
          stroke: rgba(255, 255, 255, 0.02);
        }
        .chart-grid-text {
          fill: var(--text-muted);
          font-size: 9px;
          font-weight: 600;
          text-anchor: end;
        }
        .chart-line {
          fill: none;
          stroke: #6366f1;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.4));
        }
        .chart-area {
          fill: url(#area-grad);
          fill: rgba(99, 102, 241, 0.08);
          stroke: none;
        }
        .chart-point {
          fill: #22d3ee;
          stroke: none;
        }
        .chart-point-bg {
          fill: rgba(34, 197, 94, 0);
          stroke: rgba(99, 102, 241, 0.2);
          stroke-width: 4;
          cursor: pointer;
        }
        .chart-point-label {
          fill: var(--text);
          font-size: 9px;
          font-weight: 700;
          text-anchor: middle;
        }
        .chart-axis-text {
          fill: var(--text-muted);
          font-size: 9px;
          font-weight: 700;
          text-anchor: middle;
        }
        .chart-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          padding: 1.5rem;
          font-size: 0.82rem;
          max-width: 250px;
        }
        .fallback-icon {
          width: 40px;
          height: 40px;
          opacity: 0.4;
        }

        /* Stats List */
        .stats-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 0.5rem;
        }
        [data-theme="dark"] .stat-row {
          border-bottom-color: rgba(255, 255, 255, 0.04);
        }
        .stat-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .stat-row .lbl {
          color: var(--text-muted);
        }
        .stat-row .val {
          color: var(--text);
          font-weight: 700;
        }
        .color-rose {
          color: #f43f5e !important;
        }
        .color-emerald {
          color: #10b981 !important;
        }

        /* ═════════ MARKSHEETS ═════════ */
        .marksheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .marksheet-header h3 {
          font-size: 1.25rem;
          font-weight: 850;
          letter-spacing: -0.03em;
        }
        .search-filter-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .subject-search-input {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 0.75rem;
          padding: 0.55rem 2.2rem 0.55rem 1rem;
          color: var(--text);
          font-size: 0.85rem;
          width: 260px;
          font-weight: 500;
          transition: border-color 0.2s;
        }
        [data-theme="dark"] .subject-search-input {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(255, 255, 255, 0.08);
        }
        .subject-search-input:focus {
          outline: none;
          border-color: var(--primary);
        }
        .clear-search {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.8rem;
        }

        .sems-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .sem-accordion-card {
          padding: 0;
          overflow: hidden;
        }
        .accordion-trigger {
          padding: 1.25rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.02);
          transition: background 0.2s;
        }
        [data-theme="dark"] .accordion-trigger {
          background: rgba(30, 41, 59, 0.2);
        }
        .accordion-trigger:hover {
          background: rgba(0, 0, 0, 0.04);
        }
        [data-theme="dark"] .accordion-trigger:hover {
          background: rgba(30, 41, 59, 0.4);
        }
        .sem-accordion-card.expanded .accordion-trigger {
          border-bottom: 1px solid var(--surface-border);
        }
        .trigger-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .accordion-arrow {
          font-size: 0.7rem;
          color: var(--text-muted);
          transition: transform 0.2s;
        }
        .sem-accordion-card.expanded .accordion-arrow {
          transform: rotate(180deg);
        }
        .trigger-left h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text);
        }
        .trigger-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .sem-summary-badge {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-muted);
          padding: 0.3rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .sem-summary-badge strong {
          color: var(--text);
          font-weight: 700;
          margin-left: 0.15rem;
        }
        .badge-rose {
          background: rgba(244, 63, 94, 0.08);
          color: #fca5a5;
          border-color: rgba(244, 63, 94, 0.1);
        }
        .badge-rose strong {
          color: #ef4444;
        }
        .badge-emerald {
          background: rgba(16, 185, 129, 0.08);
          color: #a7f3d0;
          border-color: rgba(16, 185, 129, 0.1);
        }
        .badge-emerald strong {
          color: #10b981;
        }

        .accordion-content {
          padding: 1.75rem;
          background: rgba(255, 255, 255, 0.2);
        }
        [data-theme="dark"] .accordion-content {
          background: rgba(15, 23, 42, 0.15);
        }
        .table-responsive {
          overflow-x: auto;
        }
        .marks-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .marks-table th {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 0.75rem 1rem;
          border-bottom: 2px solid var(--surface-border);
        }
        .marks-table td {
          padding: 0.9rem 1rem;
          border-bottom: 1px solid var(--surface-border);
          color: var(--text);
        }
        .marks-table tr:last-child td {
          border-bottom: none;
        }
        .marks-table tbody tr:hover td {
          background: rgba(0, 0, 0, 0.01);
        }
        [data-theme="dark"] .marks-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .row-failed td {
          background: rgba(244, 63, 94, 0.02);
        }
        .row-failed .subject-name-cell {
          color: #e11d48;
        }
        [data-theme="dark"] .row-failed .subject-name-cell {
          color: #fda4af;
        }

        .subject-name-cell {
          font-weight: 600;
        }
        .text-center {
          text-align: center;
        }
        .font-mono {
          font-family: monospace;
        }
        .font-bold {
          font-weight: 700;
        }
        .text-muted {
          color: var(--text-muted) !important;
        }

        /* Grade Badges */
        .grade-badge {
          font-size: 0.78rem;
          font-weight: 800;
          padding: 0.25rem 0.6rem;
          border-radius: 0.5rem;
          display: inline-block;
          min-width: 28px;
        }
        .grade-O, .grade-S { background: rgba(16, 185, 129, 0.12); color: #065f46; }
        .grade-A, .grade-A\+ { background: rgba(59, 130, 246, 0.12); color: #1e40af; }
        .grade-B, .grade-B\+ { background: rgba(139, 92, 246, 0.12); color: #5b21b6; }
        .grade-C, .grade-C\+ { background: rgba(245, 158, 11, 0.12); color: #92400e; }
        .grade-D, .grade-D\+ { background: rgba(251, 146, 60, 0.12); color: #c2410c; }
        .grade-E { background: rgba(156, 163, 175, 0.12); color: #374151; }
        .grade-F, .grade-AB { background: rgba(244, 63, 94, 0.12); color: #991b1b; }

        [data-theme="dark"] .grade-O, [data-theme="dark"] .grade-S { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        [data-theme="dark"] .grade-A, [data-theme="dark"] .grade-A\+ { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
        [data-theme="dark"] .grade-B, [data-theme="dark"] .grade-B\+ { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
        [data-theme="dark"] .grade-C, [data-theme="dark"] .grade-C\+ { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        [data-theme="dark"] .grade-D, [data-theme="dark"] .grade-D\+ { background: rgba(251, 146, 60, 0.15); color: #fdba74; }
        [data-theme="dark"] .grade-E { background: rgba(156, 163, 175, 0.15); color: #d1d5db; }
        [data-theme="dark"] .grade-F, [data-theme="dark"] .grade-AB { background: rgba(244, 63, 94, 0.15); color: #f87171; }

        /* Status Badges */
        .result-badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
          letter-spacing: 0.05em;
        }
        .status-P {
          background: rgba(16, 185, 129, 0.08);
          color: #065f46;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .status-F {
          background: rgba(244, 63, 94, 0.08);
          color: #991b1b;
          border: 1px solid rgba(244, 63, 94, 0.15);
        }
        .status-A {
          background: rgba(251, 146, 60, 0.08);
          color: #c2410c;
          border: 1px solid rgba(251, 146, 60, 0.15);
        }

        [data-theme="dark"] .status-P {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.2);
        }
        [data-theme="dark"] .status-F {
          background: rgba(244, 63, 94, 0.1);
          color: #ef4444;
          border-color: rgba(244, 63, 94, 0.2);
        }
        [data-theme="dark"] .status-A {
          background: rgba(251, 146, 60, 0.1);
          color: #fb923c;
          border-color: rgba(251, 146, 60, 0.2);
        }

        /* ═════════ UTILS / ANIMATIONS ═════════ */
        .spinner-inline {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.15);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        [data-theme="dark"] .spinner-inline {
          border-color: rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 0.4s ease-out 0.2s forwards;
          animation-fill-mode: both;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ═════════ PRINT STYLES ═════════ */
        @media print {
          body {
            background: #fff !important;
            color: #000 !important;
          }
          .vtu-results-page {
            padding: 0 !important;
            background: #fff !important;
            min-height: auto !important;
          }
          .decor-orbs, .decor-grid, .no-print, .breadcrumbs {
            display: none !important;
          }
          .glass-card {
            background: #fff !important;
            color: #000 !important;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 1.5rem !important;
          }
          .student-profile {
            margin-top: 0 !important;
            margin-bottom: 1.5rem !important;
            border-bottom: 2px solid #000 !important;
          }
          .student-name {
            color: #000 !important;
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          .profile-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            border-top: 1px solid #ddd !important;
            padding-top: 1rem !important;
          }
          .meta-val {
            color: #000 !important;
          }
          .highlight-usn {
            color: #000 !important;
          }
          .analytics-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          /* Hide SVG chart on print, print summary table and progress */
          .analytics-card:nth-child(2) {
            display: none !important;
          }
          .accordion-content {
            display: block !important;
            padding: 0 !important;
          }
          .sem-accordion-card {
            border: 1px solid #ddd !important;
            border-radius: 0 !important;
            margin-bottom: 1.5rem !important;
            page-break-inside: avoid;
          }
          .accordion-trigger {
            background: #f5f5f5 !important;
            border-bottom: 1px solid #ddd !important;
            padding: 0.75rem 1rem !important;
          }
          .trigger-left h4 {
            color: #000 !important;
          }
          .sem-summary-badge strong {
            color: #000 !important;
          }
          .marks-table th {
            color: #000 !important;
            border-bottom: 2px solid #000 !important;
            padding: 0.5rem !important;
          }
          .marks-table td {
            color: #000 !important;
            border-bottom: 1px solid #ddd !important;
            padding: 0.5rem !important;
          }
          .grade-badge, .result-badge {
            background: none !important;
            color: #000 !important;
            border: none !important;
            padding: 0 !important;
            font-weight: bold !important;
          }
        }

        /* Responsive refinements */
        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          .span-two-mobile {
            grid-column: span 1;
          }
          .input-row {
            flex-direction: column;
          }
          .btn-search {
            padding: 1.1rem;
            justify-content: center;
          }
          .marksheet-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .subject-search-input {
            width: 100%;
          }
        }
      `}</style>
      
      {/* Visual Definitions for SVG Gradients */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="cyan-indigo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
