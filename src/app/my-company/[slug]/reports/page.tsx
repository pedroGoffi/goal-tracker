"use client";

import { useState, useMemo } from "react";
import { Report } from "@prisma/client";
import { useCompanyReports } from "@/hooks/useCompanyReports";
import { ChevronDown, Download, FileText, Filter, Loader2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubNavbar from "@/components/my-company/my-company-navbar";

interface DateRange {
  from: Date;
  to?: Date;
}

interface StatusConfig {
  label: string;
  class: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  PENDING: { label: "Pending", class: "bg-yellow-900/30 text-yellow-400" },
  COMPLETED: { label: "Completed", class: "bg-green-900/30 text-green-400" },
  IN_PROGRESS: { label: "In Progress", class: "bg-blue-900/30 text-blue-400" }
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <Badge className={`${STATUS_CONFIG[status]?.class} gap-1.5`}>
    <span className="h-2 w-2 rounded-full bg-current" />
    {STATUS_CONFIG[status]?.label}
  </Badge>
);

interface FilterProps {
  dateRange?: DateRange;
  setDateRange: (range?: DateRange) => void;
  status: string;
  setStatus: (status: string) => void;
}

const Filters = ({ dateRange, setDateRange, status, setStatus }: FilterProps) => (
  <div className="flex flex-wrap gap-3 items-center">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="pl-3 bg-neutral-800 border-neutral-700 hover:bg-neutral-700">
          <span className="mr-2 text-neutral-300">
            {dateRange?.from ? (
              dateRange.to ? (
                `${format(dateRange.from, "MM/dd/yy")} - ${format(dateRange.to, "MM/dd/yy")}`
              ) : (
                format(dateRange.from, "MM/dd/yy")
              )
            ) : "Select date range"}
          </span>
          {dateRange ? (
            <X
              className="h-4 w-4 ml-2 text-neutral-400"
              onClick={(e) => {
                e.stopPropagation();
                setDateRange(undefined);
              }}
            />
          ) : (
            <Filter className="h-4 w-4 text-neutral-400" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-neutral-800 border-neutral-700" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange as any} 
          numberOfMonths={2}
          defaultMonth={new Date()}
          className="bg-neutral-800 border-neutral-700"
          classNames={{
            head_cell: "text-neutral-400",
            day: "text-white hover:bg-neutral-700",
            nav_button: "hover:bg-neutral-700"
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700">
          <Filter className="h-4 w-4 mr-2 text-neutral-400" />
          <span className="text-neutral-300">
            Status: {status === "ALL" ? "All" : <StatusBadge status={status} />}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
        <DropdownMenuItem 
          className="text-neutral-300 hover:bg-neutral-700" 
          onClick={() => setStatus("ALL")}
        >
          All
        </DropdownMenuItem>
        {Object.keys(STATUS_CONFIG).map((key) => (
          <DropdownMenuItem
            key={key}
            className="hover:bg-neutral-700"
            onClick={() => setStatus(key)}
          >
            <StatusBadge status={key} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

interface ReportTableProps {
  reports?: Report[];
  isLoading: boolean;
}

const ReportTable = ({ reports, isLoading }: ReportTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg bg-neutral-800" />
        ))}
      </div>
    );
  }

  if (!reports?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <FileText className="h-12 w-12 text-neutral-600" />
        <p className="text-neutral-500">No reports found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-neutral-800 hover:bg-neutral-800">
        <TableRow className="border-neutral-700">
          <TableHead className="text-neutral-300">Title</TableHead>
          <TableHead className="hidden md:table-cell text-neutral-300">Date</TableHead>
          <TableHead className="text-neutral-300">Status</TableHead>
          <TableHead className="text-right text-neutral-300">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id} className="border-neutral-700 hover:bg-neutral-800/50">
            <TableCell className="font-medium text-neutral-100">{report.title}</TableCell>
            <TableCell className="hidden md:table-cell text-neutral-400">
              {format(new Date(report.createdAt), "MM/dd/yyyy")}
            </TableCell>
            <TableCell>
              <StatusBadge status={report.status} />
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-200">
                    <span className="sr-only">Open menu</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                  <DropdownMenuItem className="gap-2 text-neutral-300 hover:bg-neutral-700">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-neutral-300 hover:bg-neutral-700">
                    <FileText className="h-4 w-4" />
                    Details
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
  const [dateRange, setDateRange] = useState<DateRange>();
  const [status, setStatus] = useState("ALL");

  const { data: reports, isLoading, error } = useCompanyReports(
    slug as string,
    dateRange as any,
    status
  );

  return (
    <div className="min-h-screen bg-neutral-900 p-6 max-w-7xl mx-auto space-y-8">
      <SubNavbar slug={slug as string} />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-100">Reports</h1>
            <p className="text-neutral-400 mt-2">
              Manage and track company reports
            </p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white">
            <FileText className="h-4 w-4" />
            New Report
          </Button>
        </div>

        <Filters
          dateRange={dateRange}
          setDateRange={setDateRange}
          status={status}
          setStatus={setStatus}
        />

        {error ? (
          <div className="rounded-lg border border-red-800 bg-red-900/30 p-6 text-red-400">
            Error loading reports: {error.message}
          </div>
        ) : (
          <div className="rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
            <ReportTable reports={reports} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}