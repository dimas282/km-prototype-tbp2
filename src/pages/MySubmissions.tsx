import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useContribution } from '@/contexts/ContributionContext';
import { tagLevel1Options, tagLevel2Options } from '@/types/contribution';
import { ArrowLeft, FileText, Calendar, Tag, CheckCircle, XCircle, Clock, Eye, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

const MySubmissions = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { getContributionsByContributor } = useContribution();
  const navigate = useNavigate();

  const myContributions = user ? getContributionsByContributor(user.id) : [];

  const t = {
    en: {
      pageTitle: 'My Submissions',
      pageSubtitle: 'Track your knowledge contributions',
      noSubmissions: 'You have not submitted any knowledge yet',
      startContributing: 'Start Contributing',
      submittedOn: 'Submitted on',
      documentType: 'Document Type',
      priorityTopics: 'Priority Topics',
      specificTopics: 'Specific Topics',
      version: 'Version',
      preview: 'Preview',
      resubmit: 'Resubmit',
      pending: 'Pending Review',
      approved: 'Published',
      rejected: 'Rejected',
      rejectionReason: 'Rejection Reason',
      reviewedBy: 'Reviewed by',
      reviewedOn: 'Reviewed on',
      back: 'Back',
      newSubmission: 'New Submission',
    },
    id: {
      pageTitle: 'Kiriman Saya',
      pageSubtitle: 'Lacak kontribusi pengetahuan Anda',
      noSubmissions: 'Anda belum mengirimkan pengetahuan apa pun',
      startContributing: 'Mulai Berkontribusi',
      submittedOn: 'Dikirim pada',
      documentType: 'Jenis Dokumen',
      priorityTopics: 'Topik Prioritas',
      specificTopics: 'Topik Spesifik',
      version: 'Versi',
      preview: 'Pratinjau',
      resubmit: 'Kirim Ulang',
      pending: 'Menunggu Review',
      approved: 'Dipublikasikan',
      rejected: 'Ditolak',
      rejectionReason: 'Alasan Penolakan',
      reviewedBy: 'Ditinjau oleh',
      reviewedOn: 'Ditinjau pada',
      back: 'Kembali',
      newSubmission: 'Kirim Baru',
    },
  };

  const text = t[language];

  const getTagLevel1Name = (id: string) => {
    const tag = tagLevel1Options.find(t => t.id === id);
    return tag ? (language === 'id' ? tag.name : tag.nameEn) : id;
  };

  const getTagLevel2Name = (id: string) => {
    const tag = tagLevel2Options.find(t => t.id === id);
    return tag ? (language === 'id' ? tag.name : tag.nameEn) : id;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300"><Clock className="w-3 h-3 mr-1" />{text.pending}</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300"><CheckCircle className="w-3 h-3 mr-1" />{text.approved}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300"><XCircle className="w-3 h-3 mr-1" />{text.rejected}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.back}
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{text.pageTitle}</h1>
            <p className="text-muted-foreground mt-2">{text.pageSubtitle}</p>
          </div>
          <Button onClick={() => navigate('/contribute')}>
            <Plus className="w-4 h-4 mr-2" />
            {text.newSubmission}
          </Button>
        </div>

        {myContributions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">{text.noSubmissions}</p>
              <Button onClick={() => navigate('/contribute')}>
                <Plus className="w-4 h-4 mr-2" />
                {text.startContributing}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {myContributions.map(contribution => (
              <Card key={contribution.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        {contribution.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {contribution.fileName}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(contribution.status)}
                      <Badge variant="outline">v{contribution.version}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{text.submittedOn}: <span className="text-foreground">{format(new Date(contribution.submissionDate), 'dd MMM yyyy, HH:mm')}</span></span>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{text.documentType}:</span>
                      <Badge variant="secondary">{getTagLevel1Name(contribution.tagLevel1)}</Badge>
                    </div>
                    {contribution.tagLevel2.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground ml-6">{text.priorityTopics}:</span>
                        {contribution.tagLevel2.map(tag => (
                          <Badge key={tag} variant="outline">{getTagLevel2Name(tag)}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground ml-6">{text.specificTopics}:</span>
                      {contribution.tagLevel3.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-primary/5">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Review info for rejected */}
                  {contribution.status === 'rejected' && contribution.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-700">{text.rejectionReason}</p>
                          <p className="text-red-600 mt-1">{contribution.rejectionReason}</p>
                        </div>
                      </div>
                      {contribution.reviewerName && (
                        <p className="text-sm text-red-600">
                          {text.reviewedBy}: {contribution.reviewerName} • {contribution.reviewDate && format(new Date(contribution.reviewDate), 'dd MMM yyyy')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Approved info */}
                  {contribution.status === 'approved' && contribution.reviewerName && (
                    <div className="text-sm text-muted-foreground">
                      {text.reviewedBy}: {contribution.reviewerName} • {contribution.reviewDate && format(new Date(contribution.reviewDate), 'dd MMM yyyy')}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={contribution.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        {text.preview}
                      </a>
                    </Button>
                    {contribution.status === 'rejected' && (
                      <Button size="sm" onClick={() => navigate('/contribute')}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {text.resubmit}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MySubmissions;
