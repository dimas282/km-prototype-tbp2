import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useContribution } from '@/contexts/ContributionContext';
import { tagLevel1Options, tagLevel2Options, KnowledgeContribution } from '@/types/contribution';
import { ArrowLeft, FileText, User, Calendar, Tag, CheckCircle, XCircle, Clock, Eye, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const ReviewDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { contributions, updateContributionStatus } = useContribution();
  const navigate = useNavigate();

  const [selectedContribution, setSelectedContribution] = useState<KnowledgeContribution | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const t = {
    en: {
      pageTitle: 'Review Dashboard',
      pageSubtitle: 'Review and approve knowledge contributions',
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      all: 'All',
      noItems: 'No items to display',
      submittedBy: 'Submitted by',
      submittedOn: 'Submitted on',
      documentType: 'Document Type',
      priorityTopics: 'Priority Topics',
      specificTopics: 'Specific Topics',
      version: 'Version',
      preview: 'Preview',
      approve: 'Approve',
      reject: 'Reject',
      rejectTitle: 'Reject Contribution',
      rejectDesc: 'Please provide a reason for rejection. This will be visible to the contributor.',
      rejectionReason: 'Rejection Reason',
      rejectionPlaceholder: 'Enter the reason for rejection...',
      rejectionRequired: 'Rejection reason is required',
      confirmReject: 'Confirm Rejection',
      cancel: 'Cancel',
      approvedSuccess: 'Contribution approved successfully',
      rejectedSuccess: 'Contribution rejected',
      reviewedBy: 'Reviewed by',
      reviewedOn: 'Reviewed on',
      rejectionReasonLabel: 'Rejection Reason',
      back: 'Back',
      status: 'Status',
    },
    id: {
      pageTitle: 'Dasbor Review',
      pageSubtitle: 'Tinjau dan setujui kontribusi pengetahuan',
      pending: 'Menunggu Review',
      approved: 'Disetujui',
      rejected: 'Ditolak',
      all: 'Semua',
      noItems: 'Tidak ada item untuk ditampilkan',
      submittedBy: 'Diajukan oleh',
      submittedOn: 'Diajukan pada',
      documentType: 'Jenis Dokumen',
      priorityTopics: 'Topik Prioritas',
      specificTopics: 'Topik Spesifik',
      version: 'Versi',
      preview: 'Pratinjau',
      approve: 'Setujui',
      reject: 'Tolak',
      rejectTitle: 'Tolak Kontribusi',
      rejectDesc: 'Silakan berikan alasan penolakan. Ini akan terlihat oleh kontributor.',
      rejectionReason: 'Alasan Penolakan',
      rejectionPlaceholder: 'Masukkan alasan penolakan...',
      rejectionRequired: 'Alasan penolakan wajib diisi',
      confirmReject: 'Konfirmasi Penolakan',
      cancel: 'Batal',
      approvedSuccess: 'Kontribusi berhasil disetujui',
      rejectedSuccess: 'Kontribusi ditolak',
      reviewedBy: 'Ditinjau oleh',
      reviewedOn: 'Ditinjau pada',
      rejectionReasonLabel: 'Alasan Penolakan',
      back: 'Kembali',
      status: 'Status',
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

  const filteredContributions = contributions.filter(c => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  const handleApprove = (contribution: KnowledgeContribution) => {
    if (!user) return;
    updateContributionStatus(contribution.id, 'approved', user.id, user.name);
    toast({
      title: text.approvedSuccess,
    });
  };

  const handleReject = () => {
    if (!selectedContribution || !user || !rejectionReason.trim()) return;
    updateContributionStatus(selectedContribution.id, 'rejected', user.id, user.name, rejectionReason.trim());
    setShowRejectDialog(false);
    setRejectionReason('');
    setSelectedContribution(null);
    toast({
      title: text.rejectedSuccess,
    });
  };

  const openRejectDialog = (contribution: KnowledgeContribution) => {
    setSelectedContribution(contribution);
    setShowRejectDialog(true);
  };

  const pendingCount = contributions.filter(c => c.status === 'pending').length;
  const approvedCount = contributions.filter(c => c.status === 'approved').length;
  const rejectedCount = contributions.filter(c => c.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {text.back}
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{text.pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{text.pageSubtitle}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              {text.pending}
              {pendingCount > 0 && <Badge variant="secondary" className="ml-1">{pendingCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              {text.approved}
              <Badge variant="secondary" className="ml-1">{approvedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <XCircle className="w-4 h-4" />
              {text.rejected}
              <Badge variant="secondary" className="ml-1">{rejectedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="all">{text.all}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredContributions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  {text.noItems}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredContributions.map(contribution => (
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{text.submittedBy}: <span className="text-foreground">{contribution.contributorName}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{text.submittedOn}: <span className="text-foreground">{format(new Date(contribution.submissionDate), 'dd MMM yyyy, HH:mm')}</span></span>
                        </div>
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

                      {/* Review info for approved/rejected */}
                      {contribution.status !== 'pending' && contribution.reviewerName && (
                        <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{text.reviewedBy}: <span className="text-foreground">{contribution.reviewerName}</span></span>
                          </div>
                          {contribution.reviewDate && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{text.reviewedOn}: <span className="text-foreground">{format(new Date(contribution.reviewDate), 'dd MMM yyyy, HH:mm')}</span></span>
                            </div>
                          )}
                          {contribution.status === 'rejected' && contribution.rejectionReason && (
                            <div className="flex items-start gap-2 text-muted-foreground bg-red-50 p-3 rounded-lg">
                              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                              <div>
                                <span className="font-medium text-red-700">{text.rejectionReasonLabel}:</span>
                                <p className="text-red-600 mt-1">{contribution.rejectionReason}</p>
                              </div>
                            </div>
                          )}
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
                        {contribution.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => handleApprove(contribution)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {text.approve}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => openRejectDialog(contribution)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              {text.reject}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{text.rejectTitle}</DialogTitle>
              <DialogDescription>{text.rejectDesc}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">{text.rejectionReason}</Label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder={text.rejectionPlaceholder}
                  rows={4}
                />
                {!rejectionReason.trim() && (
                  <p className="text-sm text-destructive">{text.rejectionRequired}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                {text.cancel}
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                {text.confirmReject}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewDashboard;
