"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type SemesterCourse = {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
  progress: number;
  status: "On Track" | "At Risk" | "Completed";
};

const statusVariant: Record<
  SemesterCourse["status"],
  "success" | "warning" | "neutral"
> = {
  "On Track": "success",
  "At Risk": "warning",
  Completed: "neutral",
};

export function CoursesTable({ onAddCourse }: { onAddCourse: () => void }) {
  const [courses, setCourses] = useState<SemesterCourse[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
      })) as SemesterCourse[];
      setCourses(fetchedCourses);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const totalCredits = courses.reduce(
    (acc, curr) => acc + (curr.credits || 0),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Current Semester Courses</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {user
              ? `${courses.length} courses · ${totalCredits} credit hours`
              : "Sign in to view your courses"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddCourse}
          disabled={!user}
        >
          <Plus />
          Add course
        </Button>
      </CardHeader>
      <CardContent className="px-0 pt-4 pb-2">
        {user ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Course</th>
                  <th className="px-3 py-2 font-medium">Credits</th>
                  <th className="hidden px-3 py-2 font-medium md:table-cell">
                    Progress
                  </th>
                  <th className="px-3 py-2 font-medium">Grade</th>
                  <th className="px-5 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium text-foreground">
                          {course.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.code}
                        </p>
                      </td>
                      <td className="px-3 py-3 tabular-nums text-muted-foreground">
                        {course.credits}
                      </td>
                      <td className="hidden px-3 py-3 md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={course.progress || 0}
                            className="h-1.5 w-24"
                          />
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {course.progress || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-semibold text-foreground tabular-nums">
                          {course.grade}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Badge
                          variant={statusVariant[course.status] || "neutral"}
                        >
                          {course.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-sm text-muted-foreground"
                    >
                      No courses added yet. Click "Add course" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            Please sign in to view and manage your courses.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
