"use client";

import { useState, useEffect } from "react";
import { CalendarClock, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type Deadline = {
  id: string;
  title: string;
  course: string;
  due: string;
  type?: "Assignment" | "Exam" | "Project" | "Quiz";
  urgent?: boolean;
};

const typeVariant: Record<
  NonNullable<Deadline["type"]>,
  "default" | "warning" | "neutral"
> = {
  Assignment: "default",
  Exam: "warning",
  Project: "neutral",
  Quiz: "neutral",
};

export function Upcoming({ onAddAssignment }: { onAddAssignment: () => void }) {
  const [assignments, setAssignments] = useState<Deadline[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setAssignments([]);
      return;
    }

    const assignmentsRef = collection(db, "profiles", user.uid, "assigments");
    const q = query(assignmentsRef, orderBy("due", "asc"));

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const fetchedAssignments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Deadline[];
      setAssignments(fetchedAssignments);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddAssignment}
          disabled={!user}
        >
          <Plus />
          Add
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        {user ? (
          <ul className="flex flex-col gap-3">
            {assignments.length > 0 ? (
              assignments.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
                >
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <CalendarClock className="size-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      {item.urgent ? (
                        <Badge variant="danger">Urgent</Badge>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.course} · {item.due}
                    </p>
                  </div>
                  <Badge variant={typeVariant[item.type || "Assignment"]}>
                    {item.type || "Assignment"}
                  </Badge>
                </li>
              ))
            ) : (
              <li className="text-center text-sm text-muted-foreground py-6">
                No upcoming assignments. Click "Add" to schedule one.
              </li>
            )}
          </ul>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-6">
            Please sign in to view your upcoming assignments.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
