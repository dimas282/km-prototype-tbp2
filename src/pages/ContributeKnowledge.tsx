import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useContribution } from '@/contexts/ContributionContext';
import { tagLevel1Options, tagLevel2Options } from '@/types/contribution';
import { knowledgeTopics } from '@/data/knowledgeTopics';
import { Upload, X, Plus, FileText, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContributeKnowledge = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { addContribution } = useContribution();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [knowledgeTopic, setKnowledgeTopic] = useState('');
  const [specificTopic, setSpecificTopic] = useState('');
  const [tagLevel1, setTagLevel1] = useState('');
  const [tagLevel2, setTagLevel2] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = {
    en: {
      pageTitle: 'Contribute Knowledge',
      pageSubtitle: 'Share your knowledge with the organization',
      basicInfo: 'Basic Information',
      title: 'File Title',
      titlePlaceholder: 'Enter knowledge title',
      titleRequired: 'Title is required',
      pdfUpload: 'PDF Document',
      pdfRequired: 'PDF file is required',
      pdfOnly: 'Only PDF files are accepted',
      dragDrop: 'Drag and drop your PDF here, or click to browse',
      maxSize: 'Maximum file size: 10MB',
      taxonomyTags: 'Knowledge Tagging',
      tagLevel1: 'Document Type',
      tagLevel1Desc: 'Jenis Dokumen Aset Pengetahuan',
      tagLevel1Required: 'Document type is required',
      tagLevel2: 'Priority Knowledge Topics',
      tagLevel2Desc: 'Topik Pengetahuan Prioritas - Select one or more',
      knowledgeTopic: 'Knowledge Topic',
      knowledgeTopicRequired: 'Knowledge topic is required',
      specificTopic: 'Specific Knowledge Topic',
      specificTopicRequired: 'Specific knowledge topic is required',
      keyword: 'Keyword',
      keywordPlaceholder: 'Type and press Enter to add keyword',
      submit: 'Submit for Review',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      successTitle: 'Submission Successful',
      successMessage: 'Your knowledge contribution has been submitted for review.',
      required: 'Required',
      optional: 'Optional',
      back: 'Back',
      uploadFile: 'Upload File',
      selectKnowledgeTopic: 'Select knowledge topic first',
    },
    id: {
      pageTitle: 'Kontribusi Pengetahuan',
      pageSubtitle: 'Bagikan pengetahuan Anda dengan organisasi',
      basicInfo: 'Informasi Dasar',
      title: 'Judul File',
      titlePlaceholder: 'Masukkan judul pengetahuan',
      titleRequired: 'Judul wajib diisi',
      pdfUpload: 'Dokumen PDF',
      pdfRequired: 'File PDF wajib diunggah',
      pdfOnly: 'Hanya file PDF yang diterima',
      dragDrop: 'Seret dan lepas PDF Anda di sini, atau klik untuk memilih',
      maxSize: 'Ukuran file maksimal: 10MB',
      taxonomyTags: 'Penandaan Pengetahuan',
      tagLevel1: 'Jenis Dokumen',
      tagLevel1Desc: 'Jenis Dokumen Aset Pengetahuan',
      tagLevel1Required: 'Jenis dokumen wajib dipilih',
      tagLevel2: 'Topik Pengetahuan Prioritas',
      tagLevel2Desc: 'Topik Pengetahuan Prioritas - Pilih satu atau lebih',
      knowledgeTopic: 'Topik Pengetahuan',
      knowledgeTopicRequired: 'Topik pengetahuan wajib dipilih',
      specificTopic: 'Topik Pengetahuan Spesifik',
      specificTopicRequired: 'Topik pengetahuan spesifik wajib dipilih',
      keyword: 'Kata Kunci',
      keywordPlaceholder: 'Ketik dan tekan Enter untuk menambah kata kunci',
      submit: 'Kirim untuk Ditinjau',
      submitting: 'Mengirim...',
      cancel: 'Batal',
      successTitle: 'Pengiriman Berhasil',
      successMessage: 'Kontribusi pengetahuan Anda telah dikirim untuk ditinjau.',
      required: 'Wajib',
      optional: 'Opsional',
      back: 'Kembali',
      uploadFile: 'Unggah File',
      selectKnowledgeTopic: 'Pilih topik pengetahuan terlebih dahulu',
    },
  };

  const text = t[language];

  // Get specific topics based on selected knowledge topic
  const availableSpecificTopics = useMemo(() => {
    if (!knowledgeTopic) return [];
    const topic = knowledgeTopics.find(kt => kt.id === knowledgeTopic);
    return topic?.specificTopics || [];
  }, [knowledgeTopic]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, file: text.pdfOnly }));
        return;
      }
      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleTagLevel2Change = (tagId: string, checked: boolean) => {
    if (checked) {
      setTagLevel2(prev => [...prev, tagId]);
    } else {
      setTagLevel2(prev => prev.filter(t => t !== tagId));
    }
  };

  const handleKnowledgeTopicChange = (value: string) => {
    setKnowledgeTopic(value);
    setSpecificTopic(''); // Reset specific topic when knowledge topic changes
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords(prev => [...prev, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = text.titleRequired;
    if (!knowledgeTopic) newErrors.knowledgeTopic = text.knowledgeTopicRequired;
    if (!specificTopic) newErrors.specificTopic = text.specificTopicRequired;
    if (!tagLevel1) newErrors.tagLevel1 = text.tagLevel1Required;
    if (!file) newErrors.file = text.pdfRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    addContribution({
      title: title.trim(),
      fileName: file!.name,
      fileUrl: URL.createObjectURL(file!),
      tagLevel1,
      tagLevel2,
      tagLevel3: [specificTopic, ...keywords],
      contributorId: user.id,
      contributorName: user.name,
      contributorEmail: user.email,
    });

    toast({
      title: text.successTitle,
      description: text.successMessage,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.back}
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{text.pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{text.pageSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information - Title Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{text.basicInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="title">{text.title}</Label>
                  <Badge variant="destructive" className="text-xs">{text.required}</Badge>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={text.titlePlaceholder}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.title}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Knowledge Tagging */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{text.taxonomyTags}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Knowledge Topic (New Required Field) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.knowledgeTopic}</Label>
                  <Badge variant="destructive" className="text-xs">{text.required}</Badge>
                </div>
                <Select value={knowledgeTopic} onValueChange={handleKnowledgeTopicChange}>
                  <SelectTrigger className={errors.knowledgeTopic ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select knowledge topic..." />
                  </SelectTrigger>
                  <SelectContent>
                    {knowledgeTopics.map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.knowledgeTopic && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.knowledgeTopic}
                  </p>
                )}
              </div>

              {/* Tag Level 1 - Document Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.tagLevel1}</Label>
                  <Badge variant="destructive" className="text-xs">{text.required}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{text.tagLevel1Desc}</p>
                <Select value={tagLevel1} onValueChange={setTagLevel1}>
                  <SelectTrigger className={errors.tagLevel1 ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select document type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tagLevel1Options.map(opt => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {language === 'id' ? opt.name : opt.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tagLevel1 && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.tagLevel1}
                  </p>
                )}
              </div>

              {/* Tag Level 2 - Priority Topics (Optional) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.tagLevel2}</Label>
                  <Badge variant="secondary" className="text-xs">{text.optional}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{text.tagLevel2Desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tagLevel2Options.map(opt => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={opt.id}
                        checked={tagLevel2.includes(opt.id)}
                        onCheckedChange={checked => handleTagLevel2Change(opt.id, checked as boolean)}
                      />
                      <label htmlFor={opt.id} className="text-sm cursor-pointer">
                        {language === 'id' ? opt.name : opt.nameEn}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Knowledge Topic (Based on selected Knowledge Topic) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.specificTopic}</Label>
                  <Badge variant="destructive" className="text-xs">{text.required}</Badge>
                </div>
                <Select 
                  value={specificTopic} 
                  onValueChange={setSpecificTopic}
                  disabled={!knowledgeTopic}
                >
                  <SelectTrigger className={errors.specificTopic ? 'border-destructive' : ''}>
                    <SelectValue placeholder={knowledgeTopic ? "Select specific topic..." : text.selectKnowledgeTopic} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSpecificTopics.map(topic => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specificTopic && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.specificTopic}
                  </p>
                )}
              </div>

              {/* Keyword (Optional, Multiple) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.keyword}</Label>
                  <Badge variant="secondary" className="text-xs">{text.optional}</Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={e => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    placeholder={text.keywordPlaceholder}
                  />
                  <Button type="button" variant="outline" onClick={handleAddKeyword}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map(keyword => (
                      <Badge key={keyword} variant="secondary" className="pr-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Upload File */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{text.uploadFile}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* PDF Upload */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{text.pdfUpload}</Label>
                  <Badge variant="destructive" className="text-xs">{text.required}</Badge>
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary/50 ${
                    errors.file ? 'border-destructive' : 'border-border'
                  } ${file ? 'bg-primary/5' : ''}`}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={e => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">{text.dragDrop}</p>
                      <p className="text-sm text-muted-foreground mt-1">{text.maxSize}</p>
                    </>
                  )}
                </div>
                {errors.file && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.file}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              {text.cancel}
            </Button>
            <Button type="submit">
              <Check className="w-4 h-4 mr-2" />
              {text.submit}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ContributeKnowledge;
