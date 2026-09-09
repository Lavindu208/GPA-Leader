"use client";

import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, Clock } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
  progress: number;
  status: "On Track" | "At Risk" | "Completed";
  attendance_percent: number;
};

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  "On Track": "success",
  "At Risk": "warning",
  Completed: "neutral",
};

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      return;
    }

    const coursesRef = collection(db, "profiles", user.uid, "courses");
    const q = query(coursesRef);

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const fetchedCourses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];
      setCourses(fetchedCourses);
      setLoading(false);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header onMenu={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              My Courses
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {user
                ? `You are enrolled in ${courses.length} courses (${totalCredits} credits).`
                : "Sign in to view your courses."}
            </p>
          </div>

          {!user && !loading && (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Please sign in to view your courses.
              </p>
            </div>
          )}

          {user && loading && (
            <div className="flex h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading courses...
              </p>
            </div>
          )}

          {user && !loading && courses.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                No courses found. Add some from your dashboard!
              </p>
            </div>
          )}

          {user && !loading && courses.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="flex flex-col transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="font-mono">
                        {course.code}
                      </Badge>
                      <Badge
                        variant={statusVariant[course.status] || "neutral"}
                      >
                        {course.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-xl">
                      {course.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-end gap-5 pt-0">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="size-4 text-foreground/70" />
                        <span>{course.credits} Credits</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="size-4 text-foreground/70" />
                        <span>Target: {course.grade}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-4 text-foreground/70" />
                        <span>Attend: {course.attendance_percent || 0}%</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-muted-foreground">
                          Course Progress
                        </span>
                        <span className="font-medium">
                          {course.progress || 0}%
                        </span>
                      </div>
                      <Progress value={course.progress || 0} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
