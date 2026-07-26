'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useUploadThing } from '@/utils/uploadthing';

interface UploadedFile {
    file: File;
    progress: number;
    error: string | null;
}

export default function UploadPage() {
    // Form fields state
    const [fullName, setFullName] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [scheme, setScheme] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [hallOfFame, setHallOfFame] = useState('');
    const [materialTypes, setMaterialTypes] = useState<string[]>([]);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploadedFilesList, setUploadedFilesList] = useState<{ name: string; url: string; size: number }[]>([]);

    // Form states
    const [isDragActive, setIsDragActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const collegeMaxLen = 120;

    // Handle material type checkbox changes
    const handleCheckboxChange = (type: string) => {
        setMaterialTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
        // Clear checkbox error if checked
        if (errors.materialTypes) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy.materialTypes;
                return copy;
            });
        }
    };

    // Helper to format file sizes
    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Add files with validation
    const handleAddFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;

        const currentFilesCount = files.length;
        const maxFiles = 5;
        const maxSizeBytes = 15 * 1024 * 1024; // 15MB

        const updatedFiles = [...files];

        Array.from(newFiles).forEach((file) => {
            let error: string | null = null;

            // Check file count limit
            if (updatedFiles.length >= maxFiles) {
                error = 'Maximum 5 files allowed';
            } 
            // Check file type (PDF only)
            else if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
                error = 'Only PDF files are allowed';
            }
            // Check file size
            else if (file.size > maxSizeBytes) {
                error = 'File size exceeds 15MB limit';
            }

            // Check if file is already added
            const isDuplicate = updatedFiles.some((f) => f.file.name === file.name && f.file.size === file.size);
            if (isDuplicate) return;

            updatedFiles.push({
                file,
                progress: 0,
                error,
            });
        });

        setFiles(updatedFiles);
        
        // Clear files error if we have at least one valid file
        const hasValidFile = updatedFiles.some(f => !f.error);
        if (hasValidFile && errors.files) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy.files;
                return copy;
            });
        }
    };

    // Remove file from staging
    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle drag events
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // Handle drop event
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleAddFiles(e.dataTransfer.files);
        }
    };

    // Handle file input change
    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleAddFiles(e.target.files);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: async (res) => {
            if (res) {
                const list = res.map(r => ({
                    name: r.name,
                    url: r.url,
                    size: r.size,
                }));
                setUploadedFilesList(list);
                
                try {
                    const response = await fetch('/api/submit-form/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fullName,
                            collegeName,
                            email,
                            phone,
                            scheme,
                            branch,
                            semester,
                            subjectCode,
                            subjectName,
                            hallOfFame,
                            materialTypes,
                            files: list,
                        }),
                    });

                    const data = await response.json();
                    
                    if (data.success) {
                        setIsSuccess(true);
                    } else {
                        alert(`Failed to save contribution data: ${data.error || 'Server error'}`);
                    }
                } catch (dbErr: any) {
                    console.error('Failed to submit form metadata:', dbErr);
                    alert(`Failed to save contribution: ${dbErr.message || dbErr}`);
                }
            }
            setIsSubmitting(false);
        },
        onUploadError: (err) => {
            alert(`Upload failed: ${err.message}`);
            setIsSubmitting(false);
        },
        onUploadProgress: (p) => {
            setFiles((prev) =>
                prev.map((f) => {
                    if (f.error) return f;
                    return { ...f, progress: p };
                })
            );
        },
    });

    // Form validation
    const validateForm = () => {
        const tempErrors: Record<string, string> = {};

        if (!fullName.trim()) tempErrors.fullName = 'Full Name is required';
        if (!collegeName.trim()) tempErrors.collegeName = 'University/College Name is required';
        
        if (!email.trim()) {
            tempErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = 'Enter a valid email address';
        }

        if (!scheme) tempErrors.scheme = 'Scheme selection is required';
        if (!branch) tempErrors.branch = 'Branch selection is required';
        if (!semester) tempErrors.semester = 'Semester selection is required';
        if (!subjectCode.trim()) tempErrors.subjectCode = 'Subject Code is required';
        if (!hallOfFame) tempErrors.hallOfFame = 'Hall of fame selection is required';
        
        if (materialTypes.length === 0) {
            tempErrors.materialTypes = 'Select at least one type of material';
        }

        const validFiles = files.filter(f => !f.error);
        if (validFiles.length === 0) {
            tempErrors.files = 'Please upload at least one valid PDF file';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to the first error
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const element = document.getElementById(firstErrorKey);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsSubmitting(true);

        const validFilesToUpload = files.filter(f => !f.error).map(f => f.file);

        try {
            await startUpload(validFilesToUpload);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Upload error caught:", err);
            setIsSubmitting(false);
        }
    };

    // Reset page for another upload
    const handleReset = () => {
        setFullName('');
        setCollegeName('');
        setEmail('');
        setPhone('');
        setScheme('');
        setBranch('');
        setSemester('');
        setSubjectCode('');
        setSubjectName('');
        setHallOfFame('');
        setMaterialTypes([]);
        setFiles([]);
        setUploadedFilesList([]);
        setErrors({});
        setIsSuccess(false);
    };

    return (
        <div className="upload-page-wrapper">
            <div className="container upload-container">
                {isSuccess ? (
                    <div className="success-card glass">
                        <div className="success-animation-wrapper">
                            <div className="success-checkmark">
                                <div className="checkmark-circle"></div>
                                <div className="checkmark-stem"></div>
                                <div className="checkmark-kick"></div>
                            </div>
                        </div>
                        <h2 className="success-title">Thank You, {fullName}!</h2>
                        <p className="success-message">
                            Your materials for <strong>{subjectCode} - {subjectName || 'Notes'}</strong> have been uploaded successfully and sent for verification.
                        </p>
                        
                        {hallOfFame === 'yes' && (
                            <div className="fame-notice">
                                <span className="fame-badge">🎖️ Hall of Fame</span>
                                <p>You opted in! Once verified, your contribution will be featured with your name in the contributor records.</p>
                            </div>
                        )}

                        <div className="success-details">
                            <h4>Uploaded Files:</h4>
                            <ul>
                                {uploadedFilesList.map((f, i) => (
                                    <li key={i}>
                                        <svg viewBox="0 0 24 24" className="pdf-icon-mini"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="uploaded-file-link">
                                            {f.name} ({formatBytes(f.size)})
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="success-actions">
                            <button onClick={handleReset} className="btn-upload-more">
                                Upload More Files
                            </button>
                            <Link href="/" className="btn-home">
                                Return Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="upload-form glass">
                        <h1 className="form-main-title">Upload Notes</h1>

                        {/* Full Name */}
                        <div className="form-group" id="fullName">
                            <label className="form-label">Full Name <span className="required">*</span></label>
                            <input 
                                type="text"
                                className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                                placeholder="Deepika R"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    if (errors.fullName) setErrors(prev => { const c = {...prev}; delete c.fullName; return c; });
                                }}
                            />
                            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                        </div>

                        {/* University/College Name */}
                        <div className="form-group" id="collegeName">
                            <div className="label-wrapper">
                                <label className="form-label">University/College Name <span className="required">*</span></label>
                                <span className="char-counter">{collegeName.length} / {collegeMaxLen}</span>
                            </div>
                            <input 
                                type="text"
                                className={`form-input ${errors.collegeName ? 'has-error' : ''}`}
                                placeholder="College Name"
                                value={collegeName}
                                maxLength={collegeMaxLen}
                                onChange={(e) => {
                                    setCollegeName(e.target.value);
                                    if (errors.collegeName) setErrors(prev => { const c = {...prev}; delete c.collegeName; return c; });
                                }}
                            />
                            {errors.collegeName && <span className="error-text">{errors.collegeName}</span>}
                        </div>

                        {/* Email Address */}
                        <div className="form-group" id="email">
                            <label className="form-label">Email Address <span className="required">*</span></label>
                            <input 
                                type="email"
                                className={`form-input ${errors.email ? 'has-error' : ''}`}
                                placeholder="deepika@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => { const c = {...prev}; delete c.email; return c; });
                                }}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        {/* Phone Number */}
                        <div className="form-group" id="phone">
                            <label className="form-label">Phone Number</label>
                            <input 
                                type="text"
                                className="form-input"
                                placeholder="E.g. +91 12345 54321"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Scheme */}
                        <div className="form-group" id="scheme">
                            <label className="form-label font-bold">Scheme <span className="required">*</span></label>
                            <div className="radio-group scheme-radios">
                                {[
                                    { value: '22', label: '22 Scheme' },
                                    { value: '25', label: '25 Scheme' }
                                ].map((sch) => (
                                    <label key={sch.value} className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="scheme" 
                                            value={sch.value} 
                                            checked={scheme === sch.value}
                                            onChange={() => {
                                                setScheme(sch.value);
                                                if (errors.scheme) setErrors(prev => { const c = {...prev}; delete c.scheme; return c; });
                                            }}
                                            className="hidden-radio"
                                        />
                                        <span className="custom-radio"></span>
                                        <span className="option-text">{sch.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.scheme && <span className="error-text">{errors.scheme}</span>}
                        </div>

                        {/* Branch */}
                        <div className="form-group" id="branch">
                            <label className="form-label font-bold">Branch <span className="required">*</span></label>
                            <div className="select-wrapper">
                                <select 
                                    className={`form-select ${errors.branch ? 'has-error' : ''}`}
                                    value={branch}
                                    onChange={(e) => {
                                        setBranch(e.target.value);
                                        if (errors.branch) setErrors(prev => { const c = {...prev}; delete c.branch; return c; });
                                    }}
                                >
                                    <option value="" disabled>Select your branch</option>
                                    <option value="P-cycle">P-cycle</option>
                                    <option value="C-cycle">C-cycle</option>
                                    <option value="Civil">Civil</option>
                                    <option value="CSE / ISE">CSE / ISE</option>
                                    <option value="EC">EC</option>
                                    <option value="EEE">EEE</option>
                                    <option value="ME">ME</option>
                                </select>
                                <span className="select-arrow">▾</span>
                            </div>
                            {errors.branch && <span className="error-text">{errors.branch}</span>}
                        </div>

                        {/* Semester */}
                        <div className="form-group" id="semester">
                            <label className="form-label font-bold">Semester <span className="required">*</span></label>
                            <div className="radio-group semester-radios">
                                {['1st','2nd','3rd', '4th', '5th', '6th', '7th', '8th'].map((sem) => (
                                    <label key={sem} className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="semester" 
                                            value={sem} 
                                            checked={semester === sem}
                                            onChange={() => {
                                                setSemester(sem);
                                                if (errors.semester) setErrors(prev => { const c = {...prev}; delete c.semester; return c; });
                                            }}
                                            className="hidden-radio"
                                        />
                                        <span className="custom-radio"></span>
                                        <span className="option-text">{sem}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.semester && <span className="error-text">{errors.semester}</span>}
                        </div>

                        {/* Subject Code */}
                        <div className="form-group" id="subjectCode">
                            <label className="form-label">Subject Code <span className="required">*</span></label>
                            <input 
                                type="text"
                                className={`form-input ${errors.subjectCode ? 'has-error' : ''}`}
                                placeholder="Example: BCS401, BEC456A"
                                value={subjectCode}
                                onChange={(e) => {
                                    setSubjectCode(e.target.value);
                                    if (errors.subjectCode) setErrors(prev => { const c = {...prev}; delete c.subjectCode; return c; });
                                }}
                            />
                            {errors.subjectCode && <span className="error-text">{errors.subjectCode}</span>}
                        </div>

                        {/* Subject Name */}
                        <div className="form-group" id="subjectName">
                            <label className="form-label">Subject Name</label>
                            <input 
                                type="text"
                                className="form-input"
                                placeholder="Example: Data Structures, Engineering Mathematics 2"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            />
                        </div>

                        {/* Hall of Fame */}
                        <div className="form-group" id="hallOfFame">
                            <label className="form-label font-bold">Want your name in the hall of fame.? <span className="required">*</span></label>
                            <div className="radio-group fame-radios">
                                {[
                                    { value: 'yes', label: 'Yes, of course' },
                                    { value: 'no', label: 'No, not interested' }
                                ].map((opt) => (
                                    <label key={opt.value} className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="hallOfFame" 
                                            value={opt.value} 
                                            checked={hallOfFame === opt.value}
                                            onChange={() => {
                                                setHallOfFame(opt.value);
                                                if (errors.hallOfFame) setErrors(prev => { const c = {...prev}; delete c.hallOfFame; return c; });
                                            }}
                                            className="hidden-radio"
                                        />
                                        <span className="custom-radio"></span>
                                        <span className="option-text">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hallOfFame && <span className="error-text">{errors.hallOfFame}</span>}
                        </div>

                        {/* Type of Material */}
                        <div className="form-group" id="materialTypes">
                            <label className="form-label font-bold">Type of Material <span className="required">*</span></label>
                            <div className="checkbox-grid">
                                {[
                                    'Lecture Notes',
                                    'Handwritten Notes',
                                    'Textbook PDF',
                                    'Lab Manual',
                                    'Assignment Questions and Solutions'
                                ].map((type) => (
                                    <label key={type} className="checkbox-label">
                                        <input 
                                            type="checkbox"
                                            value={type}
                                            checked={materialTypes.includes(type)}
                                            onChange={() => handleCheckboxChange(type)}
                                            className="hidden-checkbox"
                                        />
                                        <span className="custom-checkbox"></span>
                                        <span className="option-text">{type}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.materialTypes && <span className="error-text">{errors.materialTypes}</span>}
                        </div>

                        {/* File Upload Zone */}
                        <div className="form-group" id="files">
                            <label className="form-label font-bold">Upload the notes / materials <span className="required">*</span></label>
                            <p className="upload-tip">Maximum 5 PDF files allowed and Each file must be 15MB or smaller</p>

                            <div style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)',
                                border: '1px solid rgba(99, 102, 241, 0.25)',
                                borderRadius: '12px',
                                padding: '0.85rem 1.25rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '0.75rem'
                            }}>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text)' }}>
                                    💡 <strong>Need to merge or compress your PDF before uploading?</strong> Use <span style={{ color: '#4f46e5', fontWeight: 800 }}>Seal PDF</span> — free, fast & zero limits!
                                </div>
                                <a 
                                    href="https://seal-pdf.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                                        color: '#ffffff',
                                        padding: '0.45rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.82rem',
                                        fontWeight: 800,
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Open Seal PDF 🚀
                                </a>
                            </div>
                            
                            <div 
                                className={`drag-drop-zone ${isDragActive ? 'active' : ''} ${errors.files ? 'has-error' : ''}`}
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={triggerFileInput}
                            >
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileInput}
                                    accept=".pdf"
                                    multiple
                                    className="hidden"
                                    style={{ display: 'none' }}
                                />
                                <div className="upload-icon-wrapper">
                                    <svg viewBox="0 0 24 24" className="cloud-icon" fill="currentColor">
                                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                                    </svg>
                                </div>
                                <p className="upload-text">
                                    Drag and Drop (or) <span className="choose-files-link">Choose Files</span>
                                </p>
                            </div>
                            {errors.files && <span className="error-text">{errors.files}</span>}

                            {/* Staged files list */}
                            {files.length > 0 && (
                                <div className="file-list">
                                    {files.map((fileObj, idx) => (
                                        <div key={idx} className={`file-item ${fileObj.error ? 'item-error' : ''}`}>
                                            <div className="file-info-col">
                                                <div className="file-icon-badge">PDF</div>
                                                <div className="file-details">
                                                    <div className="file-name" title={fileObj.file.name}>{fileObj.file.name}</div>
                                                    <div className="file-size">{formatBytes(fileObj.file.size)}</div>
                                                </div>
                                            </div>

                                            {/* Action / Progress col */}
                                            <div className="file-action-col">
                                                {isSubmitting ? (
                                                    <div className="upload-progress-container">
                                                        <div className="progress-bar-bg">
                                                            <div className="progress-bar-fill" style={{ width: `${fileObj.progress}%` }}></div>
                                                        </div>
                                                        <span className="progress-pct">{fileObj.progress}%</span>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        type="button" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveFile(idx);
                                                        }}
                                                        className="btn-remove-file"
                                                        aria-label="Remove file"
                                                    >
                                                        &times;
                                                    </button>
                                                )}
                                            </div>

                                            {fileObj.error && (
                                                <div className="file-item-error">
                                                    {fileObj.error}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="submit-section">
                            <button 
                                type="submit" 
                                className="btn-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="btn-loading-content">
                                        <svg className="spinner" viewBox="0 0 24 24">
                                            <circle className="path" cx="12" cy="12" r="10" fill="none" strokeWidth="3"></circle>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <style>{`
                .upload-page-wrapper {
                    background: var(--background);
                    min-height: 100vh;
                    padding: 5rem 1.5rem 6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color var(--transition-speed);
                }

                .upload-container {
                    max-width: 820px;
                    width: 100%;
                    margin: 0 auto;
                }

                .upload-form {
                    padding: 3rem;
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--card-shadow);
                }

                .form-main-title {
                    font-size: clamp(2rem, 5vw, 2.75rem);
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    text-align: center;
                    color: var(--text);
                    margin-bottom: 3.5rem;
                }

                .form-group {
                    margin-bottom: 2rem;
                    display: flex;
                    flex-direction: column;
                }

                .label-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .form-label {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text);
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.01em;
                }

                .form-label.font-bold {
                    font-weight: 700;
                }

                .required {
                    color: var(--accent-red);
                    margin-left: 0.2rem;
                }

                .char-counter {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    font-weight: 500;
                }

                .form-input {
                    font-family: inherit;
                    width: 100%;
                    padding: 0.85rem 1.1rem;
                    font-size: 0.975rem;
                    border: 1px solid var(--surface-border);
                    background-color: var(--surface);
                    color: var(--text);
                    border-radius: 6px;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .form-input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
                }

                .form-input::placeholder {
                    color: #A0AEC0;
                }

                .select-wrapper {
                    position: relative;
                    width: 100%;
                }

                .form-select {
                    font-family: inherit;
                    width: 100%;
                    padding: 0.85rem 2.5rem 0.85rem 1.1rem;
                    font-size: 0.975rem;
                    border: 1px solid var(--surface-border);
                    background-color: var(--surface);
                    color: var(--text);
                    border-radius: 6px;
                    outline: none;
                    appearance: none;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .form-select:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
                }

                .form-select.has-error {
                    border-color: var(--accent-red);
                }

                .select-arrow {
                    position: absolute;
                    right: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                    pointer-events: none;
                    font-size: 0.85rem;
                }

                .form-input.has-error {
                    border-color: var(--accent-red);
                }

                .error-text {
                    font-size: 0.825rem;
                    color: var(--accent-red);
                    font-weight: 600;
                    margin-top: 0.4rem;
                }

                /* Radio groups */
                .radio-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem 2.5rem;
                    margin-top: 0.25rem;
                    padding: 0.25rem 0;
                }

                .radio-label {
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    position: relative;
                }

                .hidden-radio {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .custom-radio {
                    width: 22px;
                    height: 22px;
                    border: 1.5px solid var(--text-muted);
                    border-radius: 50%;
                    margin-right: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    background: var(--surface);
                }

                .radio-label:hover .custom-radio {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }

                .hidden-radio:checked + .custom-radio {
                    border-color: var(--primary);
                    background: var(--surface);
                }

                .hidden-radio:checked + .custom-radio::after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: var(--primary);
                    border-radius: 50%;
                    display: block;
                }

                .option-text {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--primary); /* Purple text style matching reference */
                    transition: color 0.2s;
                }

                .radio-label:hover .option-text {
                    opacity: 0.85;
                }

                /* Checkboxes */
                .checkbox-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                @media (min-width: 640px) {
                    .checkbox-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .checkbox-label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    position: relative;
                }

                .hidden-checkbox {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .custom-checkbox {
                    width: 20px;
                    height: 20px;
                    border: 1.5px solid var(--text-muted);
                    border-radius: 4px;
                    margin-right: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    background: var(--surface);
                    flex-shrink: 0;
                }

                .checkbox-label:hover .custom-checkbox {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }

                .hidden-checkbox:checked + .custom-checkbox {
                    border-color: var(--primary);
                    background: var(--primary);
                }

                .hidden-checkbox:checked + .custom-checkbox::after {
                    content: '✓';
                    color: white;
                    font-size: 0.8rem;
                    font-weight: 800;
                    display: block;
                }

                /* File drop zone */
                .upload-tip {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    margin-bottom: 0.75rem;
                }

                .drag-drop-zone {
                    border: 1.5px dashed var(--text-muted);
                    border-radius: var(--radius-sm);
                    padding: 2.5rem 1.5rem;
                    text-align: center;
                    cursor: pointer;
                    background: var(--surface);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .drag-drop-zone:hover, .drag-drop-zone.active {
                    border-color: var(--primary);
                    background: rgba(79, 70, 229, 0.02);
                }

                .drag-drop-zone.has-error {
                    border-color: var(--accent-red);
                }

                .upload-icon-wrapper {
                    margin-bottom: 1rem;
                    color: var(--text);
                    transition: color 0.3s;
                }

                .drag-drop-zone:hover .upload-icon-wrapper {
                    color: var(--primary);
                }

                .cloud-icon {
                    width: 48px;
                    height: 48px;
                }

                .upload-text {
                    font-size: 0.95rem;
                    color: var(--text);
                    font-weight: 600;
                }

                .choose-files-link {
                    color: var(--primary);
                    text-decoration: underline;
                    font-weight: 700;
                }

                /* File List styling */
                .file-list {
                    margin-top: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .file-item {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.85rem 1.25rem;
                    border: 1px solid var(--surface-border);
                    border-radius: 8px;
                    background: var(--surface);
                    gap: 1rem;
                    position: relative;
                }

                .file-item.item-error {
                    border-color: rgba(239, 68, 68, 0.3);
                    background: rgba(239, 68, 68, 0.01);
                }

                .file-info-col {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    max-width: 70%;
                }

                .file-icon-badge {
                    background: var(--accent-red);
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 0.25rem 0.4rem;
                    border-radius: 4px;
                }

                .file-details {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .file-name {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .file-size {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-top: 0.1rem;
                }

                .file-action-col {
                    display: flex;
                    align-items: center;
                }

                .btn-remove-file {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1.5rem;
                    line-height: 1;
                    cursor: pointer;
                    padding: 0.25rem;
                    transition: color 0.2s;
                }

                .btn-remove-file:hover {
                    color: var(--accent-red);
                }

                .file-item-error {
                    width: 100%;
                    font-size: 0.75rem;
                    color: var(--accent-red);
                    font-weight: 600;
                    margin-top: 0.25rem;
                }

                .upload-progress-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    width: 120px;
                }

                .progress-bar-bg {
                    flex-grow: 1;
                    height: 6px;
                    background: var(--surface-border);
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: var(--primary);
                    border-radius: 3px;
                    width: 0;
                    transition: width 0.15s ease-out;
                }

                .progress-pct {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--primary);
                    width: 32px;
                    text-align: right;
                }

                /* Submit Section */
                .submit-section {
                    margin-top: 3rem;
                    display: flex;
                    justify-content: flex-start;
                }

                .btn-submit {
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    padding: 0.85rem 2rem;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.15);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 120px;
                }

                .btn-submit:hover {
                    background-color: var(--primary-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 12px rgba(79, 70, 229, 0.25);
                }

                .btn-submit:active {
                    transform: translateY(0);
                }

                .btn-submit:disabled {
                    background-color: #A0AEC0;
                    cursor: not-allowed;
                    box-shadow: none;
                    transform: none;
                }

                .btn-loading-content {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .spinner {
                    animation: rotate 2s linear infinite;
                    width: 18px;
                    height: 18px;
                }

                .spinner .path {
                    stroke: white;
                    stroke-linecap: round;
                    animation: dash 1.5s ease-in-out infinite;
                }

                @keyframes rotate {
                    100% { transform: rotate(360deg); }
                }

                @keyframes dash {
                    0% {
                        stroke-dasharray: 1, 150;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -35;
                    }
                    100% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -124;
                    }
                }

                /* Success Card */
                .success-card {
                    padding: 4rem 3rem;
                    text-align: center;
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--card-shadow);
                }

                .success-animation-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .success-checkmark {
                    width: 72px;
                    height: 72px;
                    position: relative;
                }

                .checkmark-circle {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background: #58CC02; /* Nice bright checkmark green */
                    opacity: 0.15;
                    animation: scale-up 0.4s ease-out forwards;
                }

                .checkmark-stem {
                    width: 4px;
                    height: 24px;
                    background-color: #58CC02;
                    position: absolute;
                    left: 40px;
                    top: 22px;
                    transform: rotate(45deg);
                    border-radius: 2px;
                    transform-origin: 0 100%;
                    animation: draw-stem 0.25s 0.2s ease-out forwards;
                    opacity: 0;
                }

                .checkmark-kick {
                    width: 14px;
                    height: 4px;
                    background-color: #58CC02;
                    position: absolute;
                    left: 28px;
                    top: 42px;
                    transform: rotate(45deg);
                    border-radius: 2px;
                    transform-origin: 0 0;
                    animation: draw-kick 0.15s 0.1s ease-out forwards;
                    opacity: 0;
                }

                @keyframes scale-up {
                    0% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 0.15; }
                    100% { transform: scale(1); opacity: 0.15; }
                }

                @keyframes draw-kick {
                    0% { width: 0; opacity: 0; }
                    100% { width: 14px; opacity: 1; }
                }

                @keyframes draw-stem {
                    0% { height: 0; opacity: 0; }
                    100% { height: 24px; opacity: 1; }
                }

                .success-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: var(--text);
                    margin-bottom: 1rem;
                    letter-spacing: -0.03em;
                }

                .success-message {
                    font-size: 1.05rem;
                    color: var(--text-muted);
                    max-width: 540px;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }

                .fame-notice {
                    background: rgba(79, 70, 229, 0.04);
                    border: 1px solid rgba(79, 70, 229, 0.15);
                    border-radius: 12px;
                    padding: 1.25rem;
                    max-width: 500px;
                    margin: 0 auto 2.5rem;
                    text-align: left;
                }

                .fame-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    background: var(--primary);
                    color: white;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                }

                .fame-notice p {
                    font-size: 0.875rem;
                    color: var(--text);
                    line-height: 1.5;
                    margin: 0;
                    font-weight: 500;
                }

                .success-details {
                    text-align: left;
                    max-width: 500px;
                    margin: 0 auto 3rem;
                    border-top: 1px solid var(--surface-border);
                    padding-top: 1.5rem;
                }

                .success-details h4 {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--text);
                    margin-bottom: 0.75rem;
                }

                .success-details ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .success-details li {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    margin-bottom: 0.5rem;
                }

                .pdf-icon-mini {
                    width: 18px;
                    height: 18px;
                    color: var(--accent-red);
                }

                .uploaded-file-link {
                    color: var(--primary);
                    text-decoration: underline;
                    font-weight: 600;
                    transition: opacity 0.2s;
                }

                .uploaded-file-link:hover {
                    opacity: 0.85;
                }

                .success-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }

                .btn-upload-more {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 0.85rem 1.75rem;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-upload-more:hover {
                    background: var(--primary-hover);
                }

                .btn-home {
                    background: transparent;
                    color: var(--text-muted);
                    border: 1px solid var(--surface-border);
                    padding: 0.85rem 1.75rem;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .btn-home:hover {
                    color: var(--text);
                    border-color: var(--text-muted);
                }

                /* Mobile responsive adjustments */
                @media (max-width: 768px) {
                    .upload-page-wrapper {
                        padding: 3rem 1rem 4rem;
                    }
                    .upload-form, .success-card {
                        padding: 2rem 1.25rem;
                    }
                    .form-main-title {
                        margin-bottom: 2.5rem;
                    }
                    .radio-group {
                        gap: 1rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
