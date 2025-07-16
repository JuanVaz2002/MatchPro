"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles, Download, X, RefreshCw } from "lucide-react"

interface CVAnalysisResult {
  score: number
  strengths: string[]
  improvements: string[]
  keywords: string[]
  missingKeywords: string[]
}

export default function CVUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [professionalTitle, setProfessionalTitle] = useState("")
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [optimizedCvUrl, setOptimizedCvUrl] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  // API URLs
  const UPLOAD_URL = "https://jfvazquezrivera.app.n8n.cloud/form-test/2a87705d-8ba1-41f1-80ef-85f364ce253e"
  const ANALYSIS_URL = "https://jfvazquezrivera.app.n8n.cloud/analysis/2a87705d-8ba1-41f1-80ef-85f364ce253e" // Placeholder for analysis endpoint

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // Reset states
    setUploadError(null)
    setAnalysisError(null)
    setUploadComplete(false)
    setAnalysisComplete(false)
    setOptimizedCvUrl(null)
    setAnalysisResult(null)

    // Validate file type (support multiple formats)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please upload a PDF, DOC, or DOCX file")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB")
      return
    }

    setUploadedFile(file)
  }

  const uploadCV = async () => {
    if (!uploadedFile || !professionalTitle.trim()) {
      setUploadError("Please select a file and enter your professional title")
      return
    }

    setUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("cv", uploadedFile)
      formData.append("professionalTitle", professionalTitle.trim())
      formData.append("fileName", uploadedFile.name)
      formData.append("fileSize", uploadedFile.size.toString())
      formData.append("uploadDate", new Date().toISOString())

      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      // Handle the response based on the n8n workflow structure
      if (result.optimizedCvUrl || result.downloadUrl || result.fileUrl) {
        setOptimizedCvUrl(result.optimizedCvUrl || result.downloadUrl || result.fileUrl)
        setUploadComplete(true)

        // Automatically start analysis after successful upload
        setTimeout(() => {
          analyzeCV()
        }, 1000)
      } else {
        throw new Error("No optimized CV URL received from server")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const analyzeCV = async () => {
    if (!uploadedFile) {
      setAnalysisError("No CV file available for analysis")
      return
    }

    setAnalyzing(true)
    setAnalysisError(null)

    try {
      // For now, we'll simulate the analysis since the exact analysis endpoint structure isn't provided
      // In a real implementation, this would call the actual analysis API

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis result in the specified JSON format
      const mockAnalysisResult: CVAnalysisResult = {
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        strengths: [
          "Strong technical skills in React and JavaScript",
          "Relevant work experience at leading tech companies",
          "Clear and well-structured format",
          "Quantified achievements and impact metrics",
          "Professional presentation and layout",
        ],
        improvements: [
          "Add more specific project outcomes and metrics",
          "Include relevant certifications or courses",
          "Optimize keywords for ATS systems",
          "Consider adding a professional summary section",
          "Enhance skills section with proficiency levels",
        ],
        keywords: ["React", "JavaScript", "TypeScript", "Node.js", "Frontend", "Agile", "Git", "CSS", "HTML"],
        missingKeywords: ["Cloud Services", "Testing", "CI/CD", "Docker", "AWS", "MongoDB", "GraphQL"],
      }

      setAnalysisResult(mockAnalysisResult)
      setAnalysisComplete(true)
    } catch (error) {
      console.error("Analysis error:", error)
      setAnalysisError(error instanceof Error ? error.message : "Analysis failed. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  const downloadOptimizedCV = () => {
    if (optimizedCvUrl) {
      const link = document.createElement("a")
      link.href = optimizedCvUrl
      link.download = `optimized_${uploadedFile?.name || "cv.pdf"}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setProfessionalTitle("")
    setUploading(false)
    setAnalyzing(false)
    setUploadComplete(false)
    setAnalysisComplete(false)
    setOptimizedCvUrl(null)
    setAnalysisResult(null)
    setUploadError(null)
    setAnalysisError(null)
  }

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return <FileText className="w-6 h-6 text-blue-600" />
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload & Optimize Your CV</h1>
          <p className="text-gray-600 mt-2">Upload your CV for AI-powered optimization and detailed analysis</p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Service Status:</strong> Connected to CV optimization service
            </p>
            <p className="text-xs text-blue-600 mt-1">Supports PDF, DOC, and DOCX formats</p>
          </div>
        </div>

        {/* Error Display */}
        {(uploadError || analysisError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1">{uploadError || analysisError}</p>
            <button onClick={resetUpload} className="mt-2 text-sm text-red-600 hover:text-red-800 underline">
              Start over
            </button>
          </div>
        )}

        {!uploadedFile ? (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your CV</h3>
              <p className="text-gray-600 mb-6">Drag and drop your CV file here, or click to browse</p>
              <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileInput} className="hidden" />
                Choose File
              </label>
              <p className="text-sm text-gray-500 mt-4">Supports PDF, DOC, and DOCX files up to 10MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info and Professional Title */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">{getFileTypeIcon(uploadedFile.name)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {uploadedFile.type.split("/")[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetUpload}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Professional Title Input */}
              <div className="mb-4">
                <label htmlFor="professionalTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="professionalTitle"
                  value={professionalTitle}
                  onChange={(e) => setProfessionalTitle(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer, Marketing Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={uploading || uploadComplete}
                />
                <p className="text-xs text-gray-500 mt-1">This helps optimize your CV for your specific role</p>
              </div>

              {/* Upload Button */}
              {!uploadComplete && (
                <button
                  onClick={uploadCV}
                  disabled={uploading || !professionalTitle.trim()}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Uploading & Optimizing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload & Optimize CV
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Upload Status */}
            {(uploading || uploadComplete) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${uploadComplete ? "bg-green-100" : "bg-blue-100"}`}>
                    <Sparkles className={`w-6 h-6 ${uploadComplete ? "text-green-600" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">CV Optimization</h3>
                    <p className="text-sm text-gray-600">
                      {uploading ? "Processing your CV..." : "Optimization complete!"}
                    </p>
                  </div>
                </div>

                {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
                  </div>
                )}

                {uploadComplete && optimizedCvUrl && (
                  <button
                    onClick={downloadOptimizedCV}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Optimized CV
                  </button>
                )}
              </div>
            )}

            {/* Analysis Status */}
            {(analyzing || analysisComplete) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${analysisComplete ? "bg-green-100" : "bg-purple-100"}`}>
                    <AlertCircle className={`w-6 h-6 ${analysisComplete ? "text-green-600" : "text-purple-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">CV Analysis</h3>
                    <p className="text-sm text-gray-600">{analyzing ? "Analyzing your CV..." : "Analysis complete!"}</p>
                  </div>
                </div>

                {analyzing && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                )}
              </div>
            )}

            {/* Analysis Results */}
            {analysisComplete && analysisResult && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                      <span className="text-2xl font-bold text-green-600">{analysisResult.score}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">CV Score</h3>
                    <p className="text-gray-600">
                      {analysisResult.score >= 90
                        ? "Excellent CV with strong optimization"
                        : analysisResult.score >= 80
                          ? "Good CV with room for improvement"
                          : analysisResult.score >= 70
                            ? "Average CV that needs optimization"
                            : "CV requires significant improvements"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Strengths ({analysisResult.strengths.length})
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
                      Improvements ({analysisResult.improvements.length})
                    </h3>
                    <ul className="space-y-3">
                      {analysisResult.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Keywords Analysis */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Found Keywords ({analysisResult.keywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword: string, index: number) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Missing Keywords ({analysisResult.missingKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map((keyword: string, index: number) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps</h3>
                  <p className="text-gray-600 mb-4">Take action based on your CV analysis results</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={downloadOptimizedCV}
                      disabled={!optimizedCvUrl}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Optimized CV
                    </button>
                    <button
                      onClick={resetUpload}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Upload New CV
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
