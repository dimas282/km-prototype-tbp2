import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { documentTypes } from '@/data/departmentsData';

interface ExplorerSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  documentTypeFilter: string;
  onDocumentTypeChange: (type: string) => void;
}

export function ExplorerSearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  documentTypeFilter,
  onDocumentTypeChange,
}: ExplorerSearchFilterProps) {
  const { t, language } = useLanguage();

  const hasActiveFilters = statusFilter !== 'all' || documentTypeFilter !== 'all' || searchQuery.length > 0;

  const clearAllFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onDocumentTypeChange('all');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={language === 'en' ? 'Search documents, tags, authors...' : 'Cari dokumen, tag, penulis...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full lg:w-[160px] h-10">
            <SelectValue placeholder={language === 'en' ? 'Status' : 'Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === 'en' ? 'All Status' : 'Semua Status'}</SelectItem>
            <SelectItem value="official">{language === 'en' ? 'Official' : 'Resmi'}</SelectItem>
            <SelectItem value="validated">{language === 'en' ? 'Validated' : 'Tervalidasi'}</SelectItem>
            <SelectItem value="reference">{language === 'en' ? 'Reference' : 'Referensi'}</SelectItem>
          </SelectContent>
        </Select>

        {/* Document Type Filter */}
        <Select value={documentTypeFilter} onValueChange={onDocumentTypeChange}>
          <SelectTrigger className="w-full lg:w-[200px] h-10">
            <SelectValue placeholder={language === 'en' ? 'Document Type' : 'Jenis Dokumen'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === 'en' ? 'All Types' : 'Semua Jenis'}</SelectItem>
            {documentTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {language === 'id' ? type.nameId : type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-10">
            <X className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Clear' : 'Hapus'}
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {language === 'en' ? 'Active filters:' : 'Filter aktif:'}
          </span>
          {searchQuery && (
            <Badge variant="secondary" className="text-xs gap-1">
              {language === 'en' ? 'Search' : 'Pencarian'}: "{searchQuery}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange('')} />
            </Badge>
          )}
          {statusFilter !== 'all' && (
            <Badge variant="secondary" className="text-xs gap-1">
              Status: {statusFilter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onStatusChange('all')} />
            </Badge>
          )}
          {documentTypeFilter !== 'all' && (
            <Badge variant="secondary" className="text-xs gap-1">
              {language === 'en' ? 'Type' : 'Jenis'}: {documentTypeFilter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onDocumentTypeChange('all')} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
