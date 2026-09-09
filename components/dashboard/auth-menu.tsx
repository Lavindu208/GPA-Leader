"use client";

import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function AuthMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<"signin" | "signup" | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "profiles", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setSuccess("Successfully signed in!");
      setTimeout(() => {
        setModalType(null);
        resetForm();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = userCredential.user;

      const newProfile = {
        id: newUser.uid,
        name: name || email.split("@")[0],
        program: program || "Not specified",
        current_gpa: 0.0,
        cgpa: 0.0,
        credits_completed: 0,
        target_gpa: 4.0,
      };

      await setDoc(doc(db, "profiles", newUser.uid), newProfile);
      setProfile(newProfile);

      setSuccess("Account successfully created! You are now signed in.");

      // Keep the modal open for 2 seconds so they can read the success message
      setTimeout(() => {
        setModalType(null);
        resetForm();
      }, 2000);
    } catch (err: any) {
      console.error("Error creating profile:", err);
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setProfile(null);
      setMenuOpen(false);
      window.alert("Successfully signed out!");
    } catch (err: any) {
      window.alert("Failed to sign out: " + err.message);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setProgram("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex items-center gap-2.5" ref={menuRef}>
      {profile && (
        <>
          <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden leading-tight sm:block text-right">
            <p className="text-sm font-semibold text-foreground">
              {profile.name}
            </p>
            <p className="text-xs text-muted-foreground">{profile.program}</p>
          </div>
        </>
      )}

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Profile options"
        >
          <MoreVertical />
        </Button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-card p-1 shadow-md animate-in fade-in slide-in-from-top-2">
            {user && (
              <>
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground truncate">
                  {user.email}
                </div>
                <div className="h-px bg-border my-1" />
              </>
            )}

            <button
              onClick={() => {
                setMenuOpen(false);
                setModalType("signin");
              }}
              className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                setModalType("signup");
              }}
              className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Sign Up
            </button>

            <button
              onClick={handleSignOut}
              className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Sign Out
            </button>
          </div>
        )}

        <Modal
          open={modalType === "signin"}
          onClose={() => {
            setModalType(null);
            resetForm();
          }}
          title="Sign In"
          description="Enter your email and password to access your account."
        >
          <form onSubmit={handleSignIn} className="mt-4 flex flex-col gap-4">
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-500">{success}</p>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email / Username</label>
              <input
                type="email"
                required
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Modal>

        <Modal
          open={modalType === "signup"}
          onClose={() => {
            setModalType(null);
            resetForm();
          }}
          title="Sign Up"
          description="Create a new account and set up your profile."
        >
          <form onSubmit={handleSignUp} className="mt-4 flex flex-col gap-4">
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-500">{success}</p>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email / Username</label>
              <input
                type="email"
                required
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                required
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Program / Major</label>
              <input
                type="text"
                required
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Signing up..." : "Create Account"}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
