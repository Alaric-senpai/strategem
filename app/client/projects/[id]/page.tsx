/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Code,
  GitBranch,
  Check,
  X,
  Play,
  Pause,
  RefreshCw,
  Database,
  Cloud,
  Trello,
  MessageSquare,
  FileJson,
  Server,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";
import { ModuleEditModal } from "@/components/modals/module-edit-modal";
import { StatusUpdateModal } from "@/components/modals/status-update-modal";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<any | null>(null);

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSubmodule, setIsSubmodule] = useState(false);

  const { id } = params;

  // Function to refresh project data
  const refreshProjectData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${id}`, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error when fetching project: Server returned an error");
      }

      const data = await response.json();

      // Check if the API response indicates failure
      if (data.success === false) {
        throw new Error(data.message || "API returned an error");
      }

      setProjectData(data);
    } catch (err: any) {
      console.error("Project fetch error:", err);
      setError(err.message || "Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`, { method: "GET" });

        if (!response.ok) {
          throw new Error("Error when fetching project: Server returned an error");
        }

        const data = await response.json();

        // Check if the API response indicates failure
        if (data.success === false) {
          throw new Error(data.message || "API returned an error");
        }

        setProjectData(data);
        console.log(data);
      } catch (err: any) {
        console.error("Project fetch error:", err);
        setError(err.message || "Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [refreshProjectData]);

  // Error UI component for reuse
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex min-h-screen w-full flex-col dark">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-6 text-red-500 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Error Loading Project</h3>
            <p className="mb-4">{message}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
              >
                Try Again
              </Button>
              <Link href="/client/projects">
                <Button variant="default">Return to Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col dark">
        <Toaster position="top-right" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent animate-spin mb-4"></div>
              <p className="text-slate-400">Loading project details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !projectData) {
    return <ErrorDisplay message={error || "Failed to load project data"} />;
  }

  // Validate that we have the expected data structure
  if (!projectData.title || !projectData.$id) {
    return <ErrorDisplay message="Invalid project data structure received from server" />;
  }

  // Calculate total hours and completed hours
  const totalHours = projectData.estimated_hours || 0;

  // Calculate completed hours based on module and submodule status
  const calculateCompletedHours = () => {
    let completed = 0;

    if (!projectData.modules) return 0;

    projectData.modules.forEach((module: any) => {
      // If the entire module is completed, add all its hours
      if (module.status === "completed") {
        completed += module.estimated_hours || 0;
      }
      // If module is in progress, check submodules
      else if (module.status === "in-progress" && module.submodules?.length > 0) {
        // Add hours from completed submodules
        module.submodules.forEach((submodule: any) => {
          if (submodule.status === "completed") {
            completed += submodule.estimated_hours || 0;
          }
        });
      }
    });

    return completed;
  };

  const completedHours = calculateCompletedHours();
  const progress = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

  // Count modules and submodules
  const moduleCount = projectData.modules?.length || 0;
  const submoduleCount =
    projectData.modules?.reduce((count: number, module: any) => count + (module.submodules?.length || 0), 0) || 0;

  // Handle updating module or submodule
  const handleItemUpdate = async (id: string, data: any) => {
    try {
      const type = isSubmodule ? "submodule" : "module";

      const response = await fetch("/api/projects/modules", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          type,
          data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update");
      }

      // Refresh project data to show updated information
      await refreshProjectData();

      return true;
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "An error occurred");
      throw error;
    }
  };

  // Shorthand function for quick status updates
  const handleStatusUpdate = async (id: string, data: any, isSubmodule: boolean) => {
    try {
      setIsSubmodule(isSubmodule);
      await handleItemUpdate(id, data);
      toast.success(`Status updated successfully`);
    } catch (error) {
      // Error is already handled in handleItemUpdate
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <Toaster position="top-right" />

      {/* Edit Modal */}
      {selectedItem && (
        <ModuleEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          module={selectedItem}
          isSubmodule={isSubmodule}
          onSave={handleItemUpdate}
        />
      )}

      {/* Status Update Modal */}
      {selectedItem && (
        <StatusUpdateModal
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          item={selectedItem}
          itemType={isSubmodule ? "submodule" : "module"}
          onSave={handleItemUpdate}
        />
      )}

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/client/projects" className="flex items-center text-sm text-slate-300 hover:text-white">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-800/60 p-6 rounded-xl border border-slate-700 hover:border-teal-500/30 transition-all duration-300 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl">
                {projectData.title.substring(0, 2).toUpperCase()}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{projectData.title}</h1>
              <Badge variant="outline" className={`ml-2 ${projectData.status === "completed" ? "border-green-500/50 text-green-400" : projectData.status === "in-progress" ? "border-blue-500/50 text-blue-400" : "border-yellow-500/50 text-yellow-400"}`}>
                {projectData.status === "completed" ? "Completed" : projectData.status === "in-progress" ? "In Progress" : "Not Started"}
              </Badge>
            </div>
            <p className="text-sm text-slate-400 ml-14">{projectData.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 bg-teal-600 hover:bg-teal-700 text-white duration-300 ease-linear transition-all"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4 text-white " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                <DropdownMenuItem
                  onClick={() => {
                    toast.info("Coming soon");
                  }}
                >
                  <GitBranch className="h-4 w-4 mr-2" /> Duplicate Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" /> Export as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <X className="h-4 w-4 mr-2" /> Archive Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-800/60 border-slate-700 hover:border-teal-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${projectData.status === "completed" ? "bg-green-500" : projectData.status === "in-progress" ? "bg-blue-500" : projectData.status === "not-started" ? "bg-yellow-500" : "bg-slate-500"}`}></div>
                <div className="text-2xl font-bold text-white capitalize">{projectData.status || "Not Started"}</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-slate-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700 hover:border-teal-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Timeline</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Created</span>
                  <span className="text-xs font-medium text-emerald-300">
                    {new Date(projectData.$createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Last Updated</span>
                  <span className="text-xs font-medium text-emerald-300">
                    {new Date(projectData.$updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700 hover:border-teal-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Modules</CardTitle>
              <Code className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{moduleCount} Modules</div>
              <div className="mt-2 text-sm text-slate-400">{submoduleCount} Submodules</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-blue-500/20 px-2 py-1 text-center text-blue-500 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                  {projectData.modules?.filter((m: any) => m.status === "in-progress").length || 0} In Progress
                </div>
                <div className="rounded bg-yellow-500/20 px-2 py-1 text-center text-yellow-500 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                  {projectData.modules?.filter((m: any) => m.status === "pending").length || 0} Pending
                </div>
                <div className="rounded bg-green-500/20 px-2 py-1 text-center text-green-500 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                  {projectData.modules?.filter((m: any) => m.status === "completed").length || 0} Completed
                </div>
                <div className="rounded bg-red-500/20 px-2 py-1 text-center text-red-500 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                  {projectData.modules?.filter((m: any) => m.status === "cancelled").length || 0} Cancelled
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700 hover:border-teal-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-100">Estimated Time</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalHours} Hours</div>
              <div className="mt-2 text-sm text-slate-400">
                {completedHours} hours completed ({progress}%)
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
                <div className="rounded bg-slate-700 px-3 py-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">Time Remaining</span>
                    <span className="text-slate-300">{totalHours - completedHours} hours</span>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="bg-teal-800/60 text-blue-400 w-full md:w-max">
            <TabsTrigger value="modules" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              Modules
            </TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              API Routes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-emerald-300 my-2">Project Modules</CardTitle>
                  <CardDescription className="text-slate-400">Manage and track your project modules</CardDescription>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </CardHeader>
              <CardContent>
                {projectData.modules && projectData.modules.length > 0 ? (
                  <div className="space-y-6">
                    {projectData.modules.map((module: any) => (
                      <div key={module.$id} className="rounded-lg border border-slate-700 overflow-hidden hover:border-teal-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between p-4 bg-slate-800">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  module.status === "completed"
                                    ? "bg-green-500"
                                    : module.status === "in-progress"
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                }`}
                              ></div>
                              <h3 className="font-medium text-slate-100 text-lg">{module.name}</h3>
                              <Badge variant="outline" className={`ml-2 ${module.status === "completed" ? "border-green-500 text-green-400" : module.status === "in-progress" ? "border-blue-500 text-blue-400" : "border-yellow-500 text-yellow-400"}`}>
                                {module.status === "completed" ? "Completed" : module.status === "in-progress" ? "In Progress" : "Pending"}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-400">{module.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {module.estimated_hours} hours
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4 text-white" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedItem(module);
                                  setIsSubmodule(false);
                                  setEditModalOpen(true);
                                }}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit Module
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedItem(module);
                                  setIsSubmodule(false);
                                  setStatusModalOpen(true);
                                }}>
                                  <RefreshCw className="h-4 w-4 mr-2" /> Change Status
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Plus className="h-4 w-4 mr-2" /> Add Submodule
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                  <X className="h-4 w-4 mr-2" /> Delete Module
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {module.submodules && module.submodules.length > 0 && (
                          <div className="border-t border-slate-700 divide-y divide-slate-700">
                            {module.submodules.map((submodule: any) => (
                              <div key={submodule.$id} className="p-3 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`h-2 w-2 rounded-full ${
                                          submodule.status === "completed"
                                            ? "bg-green-500"
                                            : submodule.status === "in-progress"
                                              ? "bg-blue-500"
                                              : "bg-yellow-500"
                                        }`}
                                      ></div>
                                      <h4 className="text-sm font-medium text-slate-200">{submodule.name}</h4>
                                      <Badge variant="outline" className={`text-xs ml-2 px-1.5 py-0 h-5 ${
                                        submodule.status === "completed" ? "border-green-500/50 text-green-400" : 
                                        submodule.status === "in-progress" ? "border-blue-500/50 text-blue-400" : 
                                        "border-yellow-500/50 text-yellow-400"
                                      }`}>
                                        {submodule.status === "completed" ? "Completed" : 
                                         submodule.status === "in-progress" ? "In Progress" : "Pending"}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-slate-400">{submodule.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                                      {submodule.estimated_hours} hrs
                                    </Badge>
                                    <ContextMenu>
                                      <ContextMenuTrigger>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                      </ContextMenuTrigger>
                                      <ContextMenuContent className="bg-slate-800 border-slate-700 text-white min-w-[220px]">
                                        <ContextMenuLabel>{submodule.name}</ContextMenuLabel>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem onClick={() => {
                                          setSelectedItem(submodule);
                                          setIsSubmodule(true);
                                          setEditModalOpen(true);
                                        }}>
                                          <Edit className="h-3.5 w-3.5 mr-2" />
                                          Edit Submodule
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                          onClick={() => toast.info(`Viewing details for ${submodule.name}`)}
                                        >
                                          <Code className="h-3.5 w-3.5 mr-2" />
                                          View Details
                                        </ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem
                                          onClick={() => {
                                            setSelectedItem(submodule);
                                            setIsSubmodule(true);
                                            setStatusModalOpen(true);
                                          }}
                                        >
                                          <RefreshCw className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                          Update Status
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => {
                                          handleStatusUpdate(submodule.$id, { status: "in-progress" }, true);
                                        }}>
                                          <Play className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                          Start Work
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => {
                                          handleStatusUpdate(submodule.$id, { status: "pending" }, true);
                                        }}>
                                          <Pause className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                                          Pause Work
                                        </ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem
                                          className="text-red-500"
                                          onClick={() => toast.error(`Deleting ${submodule.name}`)}
                                        >
                                          <X className="h-3.5 w-3.5 mr-2" />
                                          Delete Submodule
                                        </ContextMenuItem>
                                      </ContextMenuContent>
                                    </ContextMenu>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-slate-400">No modules found for this project</p>
                      <Button size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Module
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-emerald-300 my-2">Tech Stack</CardTitle>
                  <CardDescription className="text-slate-400">Technologies used in this project</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 hover:border-teal-500/50">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Technology
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectData.techstack && projectData.techstack.length > 0 ? (
                    projectData.techstack.map((tech: string, index: number) => {
                      const [category, technologies] = tech.split(": ");
                      const techList = technologies ? technologies.split(", ") : [];

                      return (
                        <div key={index} className="rounded-lg border border-slate-700 overflow-hidden hover:border-teal-500/50 transition-all duration-300">
                          <div className="bg-slate-800 p-4">
                            <h3 className="font-medium text-slate-100 text-lg capitalize flex items-center">
                              {category === "frontend" && <Code className="h-4 w-4 mr-2 text-blue-400" />}
                              {category === "backend" && <GitBranch className="h-4 w-4 mr-2 text-green-400" />}
                              {category === "database" && <Database className="h-4 w-4 mr-2 text-amber-400" />}
                              {category === "cloud_hosting" && <Cloud className="h-4 w-4 mr-2 text-purple-400" />}
                              {category === "version_control" && <GitBranch className="h-4 w-4 mr-2 text-red-400" />}
                              {category === "project_management" && <Trello className="h-4 w-4 mr-2 text-indigo-400" />}
                              {category === "communication" && <MessageSquare className="h-4 w-4 mr-2 text-pink-400" />}
                              {category.replace("_", " ")}
                            </h3>
                          </div>
                          <div className="p-4 bg-slate-800/50">
                            <div className="flex flex-wrap gap-2">
                              {techList.map((item: string, techIndex: number) => (
                                <Badge key={techIndex} className="bg-slate-700 hover:bg-slate-600 transition-colors text-slate-200">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center py-8 text-slate-400">
                      <p>No tech stack information available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-emerald-300 my-2">API Routes</CardTitle>
                  <CardDescription className="text-slate-400">API endpoints for this project</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 hover:border-teal-500/50">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Endpoint
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-slate-700 overflow-hidden">
                  <div className="bg-slate-800 p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 mr-3 text-teal-400" />
                      <h3 className="font-medium text-slate-100 text-lg">API Endpoints</h3>
                    </div>
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      {projectData.status === "not-started" ? "Planning" : "Development"}
                    </Badge>
                  </div>

                  <div className="divide-y divide-slate-700">
                    <div className="p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-green-500/20 text-green-400 mr-3">GET</Badge>
                          <span className="text-slate-200 font-mono text-sm">/api/users</span>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          Authentication Required
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 ml-16">Retrieve all users</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-blue-500/20 text-blue-400 mr-3">POST</Badge>
                          <span className="text-slate-200 font-mono text-sm">/api/users</span>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          Public
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 ml-16">Create a new user</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-amber-500/20 text-amber-400 mr-3">PUT</Badge>
                          <span className="text-slate-200 font-mono text-sm">/api/users/:id</span>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          Authentication Required
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 ml-16">Update user information</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-red-500/20 text-red-400 mr-3">DELETE</Badge>
                          <span className="text-slate-200 font-mono text-sm">/api/users/:id</span>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          Admin Only
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 ml-16">Delete a user</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/30 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileJson className="h-4 w-4 mr-2 text-slate-400" />
                        <span className="text-sm text-slate-400">API Documentation</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 text-xs text-teal-400 hover:text-teal-300">
                        View Documentation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}