"use client";

import { useState, useMemo } from "react";
import { Report } from "@prisma/client";
import { useCompanyReports } from "@/hooks/useCompanyReports";
import { ChevronDown, Download, FileText, Filter, Loader2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubNavbar from "@/components/my-company/my-company-navbar";

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = useMemo(() => ({
    PENDING: { label: "Pendente", class: "bg-yellow-900/30 text-yellow-400" },
    COMPLETED: { label: "Concluído", class: "bg-green-900/30 text-green-400" },
    IN_PROGRESS: { label: "Em Andamento", class: "bg-blue-900/30 text-blue-400" }
  }), []);

  return (
    <Badge className={`${statusConfig[status as keyof typeof statusConfig]?.class} gap-1.5`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {statusConfig[status as keyof typeof statusConfig]?.label}
    </Badge>
  );
};

const ReportFilters = ({
  dateRange,
  setDateRange,
  status,
  setStatus,
}: {
  dateRange?: DateRange;
  setDateRange: (range?: DateRange) => void;
  status: string;
  setStatus: (status: string) => void;
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <DropdownMenu open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="pl-3 bg-gray-800 border-gray-700 hover:bg-gray-700">
            <span className="mr-2 text-gray-300">
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "dd/MM/yy")} - ${format(dateRange.to, "dd/MM/yy")}`
                ) : (
                  format(dateRange.from, "dd/MM/yy")
                )
              ) : "Selecionar período"}
            </span>
            {dateRange ? (
              <X
                className="h-4 w-4 ml-2 text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setDateRange(undefined);
                }}
              />
            ) : (
              <Filter className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 bg-gray-800 border-gray-700" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            defaultMonth={new Date()}
            className="bg-gray-800 border-gray-700"
            classNames={{
              head_cell: "text-gray-400",
              day: "text-white hover:bg-gray-700",
              nav_button: "hover:bg-gray-700"
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-gray-300">
              Status: {status === "ALL" ? "Todos" : <StatusBadge status={status} />}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem 
            className="text-gray-300 hover:bg-gray-700" 
            onClick={() => setStatus("ALL")}
          >
            Todos
          </DropdownMenuItem>
          {Object.entries({
            PENDING: "Pendente",
            IN_PROGRESS: "Em Andamento",
            COMPLETED: "Concluído",
          }).map(([key, label]) => (
            <DropdownMenuItem
              key={key}
              className="hover:bg-gray-700"
              onClick={() => setStatus(key)}
            >
              <StatusBadge status={key} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ReportTable = ({ reports, isLoading }: { reports?: Report[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg bg-gray-800" />
        ))}
      </div>
    );
  }

  if (!reports?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <FileText className="h-12 w-12 text-gray-600" />
        <p className="text-gray-500">Nenhum relatório encontrado</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-gray-800 hover:bg-gray-800">
        <TableRow className="border-gray-700">
          <TableHead className="text-gray-300">Título</TableHead>
          <TableHead className="hidden md:table-cell text-gray-300">Data</TableHead>
          <TableHead className="text-gray-300">Status</TableHead>
          <TableHead className="text-right text-gray-300">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id} className="border-gray-700 hover:bg-gray-800/50">
            <TableCell className="font-medium text-gray-100">{report.title}</TableCell>
            <TableCell className="hidden md:table-cell text-gray-400">
              {format(new Date(report.createdAt), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>
              <StatusBadge status={report.status} />
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200">
                    <span className="sr-only">Abrir menu</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem className="gap-2 text-gray-300 hover:bg-gray-700">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-gray-300 hover:bg-gray-700">
                    <FileText className="h-4 w-4" />
                    Detalhes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function CompanyReportsPage() {
  const { slug } = useParams();
  const [dateRange, setDateRange] = useState<DateRange | any>();
  const [status, setStatus] = useState("ALL");

  const { data, isLoading, error } = useCompanyReports(
    slug as string,
    dateRange,
    status
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 max-w-7xl mx-auto space-y-8">
      <SubNavbar slug={slug as string} />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Relatórios</h1>
            <p className="text-gray-400 mt-2">
              Gerencie e acompanhe os relatórios da empresa
            </p>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            <FileText className="h-4 w-4" />
            Novo Relatório
          </Button>
        </div>

        <ReportFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          status={status}
          setStatus={setStatus}
        />

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-900/30 p-6 text-red-400">
            Erro ao carregar relatórios: {error.message}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
            <ReportTable reports={data} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}