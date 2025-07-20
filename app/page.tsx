"use client"

import { profileImage, useState } from "react"
import { Button } from "@/components/ui/button"
// import { Heart } from "lucide-react"  // Removed duplicate import
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTheme } from "@/lib/theme"
import { useLanguage } from "@/lib/i18n"

import {
  ArrowLeft,
  Users,
  Heart,
  User,
  Search,
  MoreVertical,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  AlertTriangle,
  Eye,
  EyeOff,
  CircleUser,
  Lock,
  Wallet,
  Share2,
  Star,
  Sun,
  Moon,
  Camera,
} from "lucide-react"

type Screen =
  | "welcome"
  | "login"
  | "signup"
  | "reset-password"
  | "members"
  | "families"
  | "example-family"
  | "profile"
  | "edit-profile"
  | "favorites"
  | "settings"
  | "donation"
  | "notifications"

interface Member {
  id: string
  name: string
  role: string // e.g., "member in matias family"
  subRole: string // e.g., "freshman medicine"
  field: string // e.g., "Medicine", "Engineering", "Law", "Others"
  specialty: string // e.g., "Cardiologist"
  location: string // e.g., "Addis Ababa"
  lastSeen: string
  avatar: string
  isFavorite: boolean
  familyRole?: string // e.g., "Father", "Daughter"
}

interface Family {
  id: string
  name: string
  membersCount: string
  status: string
  avatar: string
  isFavorite: boolean
  joinStatus?: "none" | "pending" | "joined"
  description: string
  members: Member[] // Members specific to this family
}

interface Donation {
  id: string
  amount: string
  date: string
  method: string
  donor?: string
  status: "completed" | "pending" | "failed"
}

export default function Component() {
  const { toast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const [currentScreen, setCurrentScreen] = useState<Screen>("members")
  const [sortBy, setSortBy] = useState("A-Z")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [activeMemberTab, setActiveMemberTab] = useState("My Class")
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null) // New state
  const [showFamilyDetailModal, setShowFamilyDetailModal] = useState(false) // New state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true) // New state for notifications
  const [accountNumber, setAccountNumber] = useState("") // New state for account number

  const [members, setMembers] = useState<Member[]>([
    {
      id: "m1",
      name: "Dr. Hana Mekonnen",
      role: "member in matias family",
      subRole: "freshman medicine",
      field: "Medicine",
      specialty: "Cardiologist",
      location: "Addis Ababa",
      lastSeen: "August 12, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: true,
    },
    {
      id: "m2",
      name: "Abebe Kebede",
      role: "member in matias family",
      subRole: "3rd year engineering",
      field: "Engineering",
      specialty: "Software Engineer",
      location: "Addis Ababa",
      lastSeen: "September 1, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
    },
    {
      id: "m3",
      name: "Chaltu Daba",
      role: "member in matias family",
      subRole: "2nd year law",
      field: "Law",
      specialty: "Human Rights",
      location: "Adama",
      lastSeen: "October 5, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
    },
    {
      id: "m4",
      name: "Solomon Tesfaye",
      role: "member in matias family",
      subRole: "freshman medicine",
      field: "Medicine",
      specialty: "Pediatrician",
      location: "Gondar",
      lastSeen: "August 12, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: true,
    },
    {
      id: "m5",
      name: "Fatuma Ali",
      role: "member in matias family",
      subRole: "4th year business",
      field: "Others", // Using "Others" for Business
      specialty: "Marketing",
      location: "Dire Dawa",
      lastSeen: "November 20, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
    },
  ])

  const [families, setFamilies] = useState<Family[]>([
    {
      id: "f1",
      name: "Yesab & Nebert Kefle",
      membersCount: "10+ members",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: true,
      joinStatus: "none",
      description: "A vibrant family committed to community service and education since 2015.",
      members: [
        {
          id: "fm1",
          name: "Yesab Kefle",
          role: "member in Yesab & Nebert Kefle",
          subRole: "Family Head",
          field: "Others",
          specialty: "Leadership",
          location: "Addis Ababa",
          lastSeen: "Today",
          avatar: "/placeholder.svg?height=40&width=40",
          isFavorite: true,
          familyRole: "Father",
        },
        {
          id: "fm2",
          name: "Nebert Kefle",
          role: "member in Yesab & Nebert Kefle",
          subRole: "Family Co-Head",
          field: "Others",
          specialty: "Community Organizer",
          location: "Addis Ababa",
          lastSeen: "Today",
          avatar: "/placeholder.svg?height=40&width=40",
          isFavorite: true,
          familyRole: "Mother",
        },
        {
          id: "fm3",
          name: "Lelisa Kefle",
          role: "member in Yesab & Nebert Kefle",
          subRole: "Student",
          field: "Medicine",
          specialty: "Medical Student",
          location: "Addis Ababa",
          lastSeen: "Yesterday",
          avatar: "/placeholder.svg?height=40&width=40",
          isFavorite: false,
          familyRole: "Son",
        },
        {
          id: "fm4",
          name: "Sara Kefle",
          role: "member in Yesab & Nebert Kefle",
          subRole: "Student",
          field: "Engineering",
          specialty: "Engineering Student",
          location: "Addis Ababa",
          lastSeen: "2 days ago",
          avatar: "/placeholder.svg?height=40&width=40",
          isFavorite: true,
          familyRole: "Daughter",
        },
      ],
    },
    {
      id: "f2",
      name: "Matias Family",
      membersCount: "15+ members",
      status: "not active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
      joinStatus: "none",
      description: "A large family with diverse backgrounds, focusing on cultural preservation.",
      members: [], // Placeholder for members
    },
    {
      id: "f3",
      name: "Example Family 3",
      membersCount: "10+ members",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: true,
      joinStatus: "none",
      description: "A close-knit family with a passion for technology and innovation.",
      members: [], // Placeholder for members
    },
    {
      id: "f4",
      name: "Example Family 4",
      membersCount: "10+ members",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
      joinStatus: "none",
      description: "A family dedicated to agricultural development and sustainable living.",
      members: [], // Placeholder for members
    },
    {
      id: "f5",
      name: "Example Family 5",
      membersCount: "10+ members",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: true,
      joinStatus: "none",
      description: "An artistic family known for their contributions to local arts and crafts.",
      members: [], // Placeholder for members
    },
    {
      id: "f6",
      name: "Example Family 6",
      membersCount: "10+ members",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      isFavorite: false,
      joinStatus: "none",
      description: "A family of educators, committed to fostering learning and knowledge.",
      members: [], // Placeholder for members
    },
  ])

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "d1",
      amount: "123 ETB",
      date: "today",
      method: "commercial bank of Ethiopia",
      status: "completed",
    },
    {
      id: "d2",
      amount: "123 ETB",
      date: "23/04/2025",
      method: "commercial bank of Ethiopia",
      status: "completed",
    },
    {
      id: "d3",
      amount: "123 ETB",
      date: "23/03/2025",
      method: "commercial bank of Ethiopia",
      status: "completed",
    },
  ])

  const donationGoal = 100000
  const totalRaised = donations.reduce((sum, d) => sum + Number.parseFloat(d.amount.replace(" ETB", "")), 0)
  const donationProgress = (totalRaised / donationGoal) * 100

  const toggleFavoriteMember = (id: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          const newFavoriteStatus = !member.isFavorite
          toast({
            title: newFavoriteStatus ? "Added to Favorites" : "Removed from Favorites",
            description: `${member.name} has been ${newFavoriteStatus ? "added to" : "removed from"} your favorites.`,
            duration: 2000,
          })
          return { ...member, isFavorite: newFavoriteStatus }
        }
        return member
      }),
    )
  }

  const toggleFavoriteFamily = (id: string) => {
    setFamilies((prevFamilies) =>
      prevFamilies.map((family) => {
        if (family.id === id) {
          const newFavoriteStatus = !family.isFavorite
          toast({
            title: newFavoriteStatus ? "Added to Favorites" : "Removed from Favorites",
            description: `${family.name} has been ${newFavoriteStatus ? "added to" : "removed from"} your favorites.`,
            duration: 2000,
          })
          return { ...family, isFavorite: newFavoriteStatus }
        }
        return family
      }),
    )
  }

  const handleJoinRequest = (familyId: string) => {
    setFamilies((prevFamilies) =>
      prevFamilies.map((family) => {
        if (family.id === familyId && family.joinStatus === "none") {
          toast({
            title: "Join Request Sent",
            description: `Your request to join ${family.name} has been sent.`,
            duration: 2000,
          })
          return { ...family, joinStatus: "pending" }
        }
        return family
      }),
    )
  }

  const handleDonationSubmit = () => {
    if (!donationAmount || !selectedBank || !accountNumber) {
      // Added accountNumber
      toast({
        title: "Missing Information",
        description: "Please enter an amount, select a bank, and provide an account number.", // Updated description
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const newDonation: Donation = {
      id: `d${donations.length + 1}`,
      amount: `${donationAmount} ETB`,
      date: "today",
      method: selectedBank,
      status: "completed",
      donor: "Anonymous",
    }
    setDonations((prev) => [newDonation, ...prev])
    setDonationAmount("")
    setSelectedBank("")
    setAccountNumber("") // Clear account number after submission
    toast({
      title: "Donation Successful!",
      description: `Thank you for your ${newDonation.amount} donation via ${newDonation.method}.`,
      duration: 3000,
    })
  }

  const filteredMembers = members
    .filter((member) => {
      const fieldMatch = activeMemberTab === "My Class" || member.field === activeMemberTab
      const searchMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase())
      return fieldMatch && searchMatch
    })
    .sort((a, b) => {
      if (sortBy === "A-Z") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "Z-A") {
        return b.name.localeCompare(a.name)
      }
      return 0 // No change if sort mode is not A-Z or Z-A
    })

  const filteredFamilies = families
    .filter((family) => {
      const searchMatch = family.name.toLowerCase().includes(searchQuery.toLowerCase())
      return searchMatch
    })
    .sort((a, b) => {
      if (sortBy === "A-Z") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "Z-A") {
        return b.name.localeCompare(a.name)
      }
      return 0 // No change if sort mode is not A-Z or Z-A
    })

  const renderHeader = (title: string, showBack = true) => (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
      {showBack && (
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("welcome")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <h1 className="text-lg font-semibold">{t(title.toLowerCase().replace(/\s/g, "")) || title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 dark:bg-app-red-DEFAULT dark:text-white dark:border-app-yellow-DEFAULT"
        >
          <DropdownMenuItem onClick={() => setCurrentScreen("settings")}>{t("settings")}</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t("changeLanguage")}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="dark:bg-app-red-DEFAULT dark:text-white dark:border-app-yellow-DEFAULT">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("am")}>Amharic</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("om")}>Afaan Oromo</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ti")}>Tigrinya</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("so")}>Somali</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
            
          <DropdownMenuItem
  onClick={toggleTheme}
  className={`
    flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200 
    bg-white text-black hover:bg-gray 
    dark:bg-black dark:text-white 
    dark:hover:bg-gray dark:hover:text-gray
  `}
>
  {theme === "light" ? (
    
    <Moon className="h-4 w-4 text-black dark:text-app-yellow-DEFAULT" />
  ) : (
    <Sun className="h-4 w-4 text-black dark:text-white" />
  )}
  <span className="text-sm">
    {t("themeToggle")} ({theme === "light" ? "Dark" : "Light"})
  </span>
</DropdownMenuItem>

          <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>{t("logout")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 shadow-lg z-10 dark:bg-black dark:border-app-red-DEFAULT">
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 ${currentScreen === "members" ? "text-app-red-light dark:text-app-yellow-DEFAULT" : "text-gray-500 dark:text-gray-300"}`}
        onClick={() => setCurrentScreen("members")}
        type="button"
      >
        <Users className="h-5 w-5" />
        <span className="text-xs">{t("members")}</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 ${currentScreen === "families" || currentScreen === "example-family" ? "text-app-red-light dark:text-app-yellow-DEFAULT" : "text-gray-500 dark:text-gray-300"}`}
        onClick={() => setCurrentScreen("families")}
      >
        <Users className="h-5 w-5" />
        <span className="text-xs">{t("families")}</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 ${currentScreen === "favorites" ? "text-app-red-light dark:text-app-yellow-DEFAULT" : "text-gray-500 dark:text-gray-300"}`}
        onClick={() => setCurrentScreen("favorites")}
      >
        <Heart className="h-5 w-5" />
        <span className="text-xs">{t("favorites")}</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 h-auto py-2 ${currentScreen === "profile" || currentScreen === "edit-profile" || currentScreen === "settings" || currentScreen === "donation" || currentScreen === "notifications" ? "text-app-red-light dark:text-app-yellow-DEFAULT" : "text-gray-500 dark:text-gray-300"}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">{t("account")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="end"
          className="w-48 dark:bg-app-red-DEFAULT dark:text-white dark:border-app-yellow-DEFAULT"
        >
          <DropdownMenuItem onClick={() => setCurrentScreen("profile")} className="dark:hover:bg-app-red-light">
            <CircleUser className="mr-2 h-4 w-4" />
            <span>{t("profile")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCurrentScreen("settings")} className="dark:hover:bg-app-red-light">
            <Lock className="mr-2 h-4 w-4" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCurrentScreen("notifications")} className="dark:hover:bg-app-red-light">
            <Bell className="mr-2 h-4 w-4" />
            <span>{t("notifications")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className="dark:hover:bg-app-red-light">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const selectedFamily = families.find((f) => f.id === selectedFamilyId)

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <>
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[425px] dark:bg-app-red-DEFAULT dark:text-white dark:border-app-yellow-DEFAULT">
          <DialogHeader>
            <DialogTitle>{t("logout")}</DialogTitle>
            <DialogDescription>{t("logoutConfirmation")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirm(false)}
              className="dark:border-gray-300 dark:text-gray-300 dark:hover:bg-app-red-light"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={() => {
                setCurrentScreen("welcome")
                setShowLogoutConfirm(false)
              }}
              className="bg-red-800 hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90"
            >
              {t("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedFamily && (
        <Dialog open={showFamilyDetailModal} onOpenChange={setShowFamilyDetailModal}>
          <DialogContent className="sm:max-w-[425px] dark:bg-app-red-DEFAULT dark:text-white dark:border-app-yellow-DEFAULT">
            <DialogHeader>
              <DialogTitle>{selectedFamily.name}</DialogTitle>
              <DialogDescription>{t("since")} 2015</DialogDescription>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16 bg-app-red-light dark:bg-app-red-DEFAULT">
                  <Users className="h-10 w-10 text-app-yellow-DEFAULT" />
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-lg dark:text-white">{selectedFamily.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("since")} 2015</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedFamily.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
{selectedFamily.members.slice(0, 3).map((member, idx) => (
  <Avatar key={member.id || idx}>
    <AvatarImage src={member.avatar || "/placeholder.svg?height=80&width=80"} />
    <AvatarFallback>{member.name?.[0] || "U"}</AvatarFallback>
  </Avatar>
))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  + {selectedFamily.members.length} {t("members")}
                </span>
              </div>
              <div className="flex gap-2">
                {selectedFamily.joinStatus === "none" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-app-red-light border-app-red-light bg-transparent hover:bg-red-50 dark:text-app-yellow-DEFAULT dark:border-app-yellow-DEFAULT dark:hover:bg-gray-700"
                    onClick={() => handleJoinRequest(selectedFamily.id)}
                  >
                    {t("requestToJoin")}
                  </Button>
                )}
                {selectedFamily.joinStatus === "pending" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-gray-500 border-gray-300 bg-transparent cursor-not-allowed dark:border-gray-700 dark:text-gray-400"
                    disabled
                  >
                    {t("awaitingApproval")}
                  </Button>
                )}
                {selectedFamily.joinStatus === "joined" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-700 border-green-700 bg-transparent cursor-not-allowed dark:border-green-700 dark:text-green-300"
                    disabled
                  >
                    {t("joined")}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-app-red-light border-app-red-light bg-transparent hover:bg-red-50 dark:text-app-yellow-DEFAULT dark:border-app-yellow-DEFAULT dark:hover:bg-gray-700"
                  onClick={() => toggleFavoriteFamily(selectedFamily.id)}
                >
                  {selectedFamily.isFavorite ? t("removeFromFav") : t("addtoFav")}
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-3 dark:text-white">{t("members")}</h3>
                <div className="space-y-3">
                  {selectedFamily.members.map((member) => (
                    <Card
                      key={member.id}
                      className="border border-red-200 dark:border-app-red-DEFAULT dark:bg-gray-800"
                    >
                      <CardContent className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{member.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.familyRole}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleFavoriteMember(member.id)}
                        >
                          {member.isFavorite ? (
                            <Heart className="h-4 w-4 text-app-yellow-DEFAULT" fill="#FFD600" />
                          ) : (
                            <Heart className="h-4 w-4 text-gray-400" fill="none" />
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {currentScreen === "welcome" && (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 max-w-sm mx-auto dark:bg-black dark:text-white">
    <div className="w-36 h-36 bg-app-dark-red rounded-full flex items-center justify-center mb-6 dark:bg-black">
      <div className="w-36 h-36 bg-app-yellow-DEFAULT rounded-full flex items-center justify-center overflow-hidden">
        <img src="/west-ham-logo.png" alt="West Ham Logo" className="w-full h-full object-cover" />
      </div>
    </div>

    <div className="text-center mb-8">
      <p className="text-sm text-gray-600 leading-relaxed dark:text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua.
      </p>
    </div>

    <div className="w-full space-y-3">
      <p className="text-sm font-medium dark:text-white">{t("let's GetStarted")}</p>
      <Button
        className="w-full bg-app-red-light hover:bg-red-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={() => setCurrentScreen("login")}
      >
        {t("logIn")}
      </Button>
      <Button
        variant="outline"
        className="w-full border-app-red-light text-app-red-light bg-transparent dark:border-white dark:text-white"
        onClick={() => setCurrentScreen("signup")}
      >
        {t("signUp")}
      </Button>
    </div>
  </div>
)}
      {currentScreen === "login" && (
        <div className="min-h-screen bg-dark-red max-w-sm mx-auto dark:bg-app-red-DEFAULT dark:text-app-yellow-DEFAULT">
          {renderHeader("Hello!")}

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t("welcome")}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("emailMobile")}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

                <div className="text-right bg-white text-black dark:bg-black dark:text-white">
                <Button
                  variant="link"
                  className="text-sm text-gray-600 dark:text-gray-300 dark:hover:text-app-yellow-DEFAULT"
                  onClick={() => setCurrentScreen("reset-password")}
                >
                  {t("forgotPassword")}
                </Button>
                </div>

              <Button className="w-full bg-app-red-light hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90">
                {t("logIn")}
              </Button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">{t("orSignUpWith")}</div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                <img src="/placeholder.svg?height=20&width=20" alt="Google icon" className="h-5 w-5" />
                Google
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-gray-600 dark:text-gray-300 dark:hover:text-app-yellow-DEFAULT"
                  onClick={() => setCurrentScreen("signup")}
                >
                  {t("dontHaveAccount")} {t("signUp")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === "signup" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto dark:bg-black dark:text-white">
          {renderHeader("New Account")}

          <div className="p-6 space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullname">{t("fullName")}</Label>
            <Input
          id="fullname"
          placeholder="example example"
          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
          id="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="••••••••••••"
          className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => setPasswordVisible(!passwordVisible)}
            >
          {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="mobile">{t("mobileNumber")}</Label>
                <Input
                  id="mobile"
                  placeholder="+123456789"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="dob">{t("dateOfBirth")}</Label>
                <Input
                  id="dob"
                  placeholder="dd/mm/yy"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("byContinuing")}{" "}
                <Button variant="link" className="p-0 h-auto text-xs text-app-red-light dark:text-app-yellow-DEFAULT">
                  {t("termsOfUse")}
                </Button>{" "}
                {t("and")}{" "}
                <Button variant="link" className="p-0 h-auto text-xs text-app-red-light dark:text-app-yellow-DEFAULT">
                  {t("privacyPolicy")}.
                </Button>
              </p>

              <Button className="w-full bg-app-red-light hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90">
                {t("signUp")}
              </Button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">{t("orSignUpWith")}</div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                <img src="/placeholder.svg?height=20&width=20" alt="Google icon" className="h-5 w-5" />
                Google
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-gray-600 dark:text-gray-300 dark:hover:text-app-yellow-DEFAULT"
                  onClick={() => setCurrentScreen("login")}
                >
                  {t("alreadyHaveAccount")} {t("signIn")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === "reset-password" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto dark:bg-black dark:text-white">
          {renderHeader("Set Password")}

          <div className="p-6 space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Set a new password for your account. Your password must be at least 8 characters long and contain at least
          one number.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Label htmlFor="new-password">{t("password")}</Label>
            <Input
          id="new-password"
          type={passwordVisible ? "text" : "password"}
          placeholder="••••••••••••"
          className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => setPasswordVisible(!passwordVisible)}
            >
          {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          <div className="relative">
            <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
            <Input
          id="confirm-password"
          type={passwordVisible ? "text" : "password"}
          placeholder="••••••••••••"
          className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => setPasswordVisible(!passwordVisible)}
            >
          {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          <Button className="w-full bg-app-red-light hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90">
            {t("setNewPassword")}
          </Button>
        </div>
          </div>
        </div>
      )}
      {currentScreen === "members" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto pb-20 dark:bg-black dark:text-white">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">{t("members")}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t("sortBy")}</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-20 h-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectItem value="A-Z">A-Z</SelectItem>
                    <SelectItem value="Z-A">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("searchMember")}
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {["My Class", "Engineering", "Medicine", "Law", "Others", "Active"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeMemberTab === tab ? "default" : "outline"}
                  className={`flex-shrink-0 ${activeMemberTab === tab ? "bg-app-red-light text-white dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT" : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                  onClick={() => setActiveMemberTab(tab)}
                >
                  {t(tab.toLowerCase().replace(/\s/g, "")) || tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="border border-red-200 dark:border-app-red-DEFAULT dark:bg-gray-800">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                      <p className="font-medium dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.subRole}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">last seen: {member.lastSeen}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {member.specialty}, {member.location}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleFavoriteMember(member.id)}>
                    {member.isFavorite ? (
                      <Heart className="h-5 w-5 text-app-yellow-DEFAULT" fill="#FFD600" />
                    ) : (
                      <Heart className="h-5 w-5 text-gray-400" fill="none" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "families" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto pb-20 dark:bg-black dark:text-white">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">{t("families")}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t("sortBy")}</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-20 h-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectItem value="A-Z">A-Z</SelectItem>
                    <SelectItem value="Z-A">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("searchMember")}
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 space-y-3">
            {filteredFamilies.map((family) => (
              <Card key={family.id} className="border border-red-200 dark:border-app-red-DEFAULT dark:bg-gray-800">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setSelectedFamilyId(family.id)
                    setShowFamilyDetailModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-app-red-light dark:bg-app-red-DEFAULT">
                      <Users className="h-6 w-6 text-app-yellow-DEFAULT" />
                      <AvatarFallback>F</AvatarFallback>
                    </Avatar>
                    <div>
                      <Badge
                        variant="secondary"
                        className={`text-xs font-normal ${family.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                      >
                        status: {family.status}
                      </Badge>
                      <p className="font-medium dark:text-white">{family.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{family.membersCount}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavoriteFamily(family.id)
                    }}
                  >
                    {family.isFavorite ? (
                      <Heart className="h-5 w-5 text-app-yellow-DEFAULT" fill="#FFD600" />
                    ) : (
                      <Heart className="h-5 w-5 text-gray-400" fill="none" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-4">
            <Button variant="link" className="text-app-red-light dark:text-app-yellow-DEFAULT">
              see all
            </Button>
          </div>

          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "profile" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto pb-20 dark:bg-black dark:text-white">
          {renderHeader("Profile", false)}

          <div className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="space-y-2 mb-6">
              <p className="font-medium dark:text-white">XXXXX XXXXX</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">example@example.com</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">+251 XXX XXX XXX</p>
            </div>

            <div className="flex gap-3 justify-center mb-6">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentScreen("edit-profile")}
                className="dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                {t("editProfile")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t("shareProfile")}
              </Button>
            </div>
          </div>

          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "edit-profile" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto dark:bg-black dark:text-white">
          {renderHeader("edit profile")}

          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Avatar className="w-full h-full">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="profile-picture-upload"
                  className="absolute bottom-0 right-0 bg-app-red-light text-white rounded-full p-1 cursor-pointer dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                    const reader = new FileReader()
                    reader.onload = (ev) => {
                      // @ts-ignore
                      setProfileImage(ev.target.result)
                    }
                    reader.readAsDataURL(file)
                    }
                  }}
                  />
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  placeholder="XXXXX XXXXX"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <div>
                <Label htmlFor="dob-day">{t("dateOfBirth")}</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger id="dob-day" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="dob-month" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      {months.map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="dob-year" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="year">{t("year")}</Label>
                <Select>
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue placeholder={t("freshman")} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectItem value="freshman">{t("freshman")}</SelectItem>
                    <SelectItem value="sophomore">{t("sophomore")}</SelectItem>
                    <SelectItem value="junior">{t("junior")}</SelectItem>
                    <SelectItem value="senior">{t("senior")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="phone-visibility">{t("phoneNumberVisibility")}</Label>
                <Switch
                  id="phone-visibility"
                  className="data-[state=checked]:bg-app-red-light dark:data-[state=checked]:bg-app-yellow-DEFAULT"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-visibility">{t("emailVisibility")}</Label>
                <Switch
                  id="email-visibility"
                  className="data-[state=checked]:bg-app-red-light dark:data-[state=checked]:bg-app-yellow-DEFAULT"
                />
              </div>

              <Button className="w-full bg-app-red-light hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90">
                {t("saveChanges")}
              </Button>
            </div>
          </div>
        </div>
      )}
      {currentScreen === "favorites" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto pb-20 dark:bg-black dark:text-white">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">{t("favorites")}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t("sortBy")}</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-20 h-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectItem value="A-Z">A-Z</SelectItem>
                    <SelectItem value="Z-A">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("searchMember")}
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("families")}</h3>
              <p className="text-sm text-gray-500 mb-3 dark:text-gray-400">
                {
                  families
                    .filter((f) =>
                      f.isFavorite &&
                      f.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length
                }{" "}
                {
                  families
                    .filter((f) =>
                      f.isFavorite &&
                      f.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 1
                    ? t("item")
                    : t("items")
                }
              </p>
              <div className="space-y-3">
                {families
                  .filter(
                    (f) =>
                      f.isFavorite &&
                      f.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sortBy === "A-Z") {
                      return a.name.localeCompare(b.name)
                    } else if (sortBy === "Z-A") {
                      return b.name.localeCompare(a.name)
                    }
                    return 0
                  })
                  .map((family) => (
                    <Card
                      key={family.id}
                      className="border border-red-200 dark:border-app-red-DEFAULT dark:bg-gray-800"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="bg-app-red-light dark:bg-app-red-DEFAULT">
                            <Users className="h-6 w-6 text-app-yellow-DEFAULT" />
                            <AvatarFallback>F</AvatarFallback>
                          </Avatar>
                          <div>
                            <Badge
                              variant="secondary"
                              className={`text-xs font-normal ${family.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                            >
                              status: {family.status}
                            </Badge>
                            <p className="font-medium dark:text-white">{family.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{family.membersCount}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavoriteFamily(family.id)}>
                          <Heart className="h-5 w-5 text-app-yellow-DEFAULT" fill="#FFD600" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("members")}</h3>
              <p className="text-sm text-gray-500 mb-3 dark:text-gray-400">
                {
                  members
                    .filter(
                      (m) =>
                        m.isFavorite &&
                        m.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length
                }{" "}
                {
                  members
                    .filter(
                      (m) =>
                        m.isFavorite &&
                        m.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 1
                    ? t("item")
                    : t("items")
                }
              </p>
              <div className="space-y-3">
                {members
                  .filter(
                    (m) =>
                      m.isFavorite &&
                      m.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sortBy === "A-Z") {
                      return a.name.localeCompare(b.name)
                    } else if (sortBy === "Z-A") {
                      return b.name.localeCompare(a.name)
                    }
                    return 0
                  })
                  .map((member) => (
                    <Card
                      key={member.id}
                      className="border border-red-200 dark:border-app-red-DEFAULT dark:bg-gray-800"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium dark:text-white">{member.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{member.subRole}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavoriteMember(member.id)}>
                          <Heart className="h-5 w-5 text-app-yellow-DEFAULT" fill="#FFD600" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "settings" && (
        <div className="min-h-screen bg-dark-red max-w-sm mx-auto pb-20 dark:bg-app-red-DEFAULT dark:text-app-yellow-DEFAULT">
          {renderHeader("Settings")}

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("accountSection")}</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setCurrentScreen("edit-profile")}
                >
                  <CircleUser className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("editProfile")}
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <Lock className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("security")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setCurrentScreen("notifications")}
                >
                  <Bell className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("notifications")}
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <Shield className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("privacy")}
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <Star className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("linkSocials")}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("supportAbout")}</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setCurrentScreen("donation")}
                >
                  <Wallet className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("donation")}
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <HelpCircle className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("helpSupport")}
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <FileText className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("termsPolicies")}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("actions")}</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start dark:text-white dark:hover:bg-gray-800">
                  <AlertTriangle className="h-4 w-4 mr-3 text-app-yellow-DEFAULT" />
                  {t("reportProblem")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 dark:text-red-400 dark:hover:bg-gray-800"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  {t("logout")}
                </Button>
              </div>
            </div>
          </div>

          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "notifications" && (
        <div className="min-h-screen bg-dark-red max-w-sm mx-auto pb-20 dark:bg-app-red-DEFAULT dark:text-yellow">
          {renderHeader("Notifications")}
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-notifications" className="dark:text-white">
                {t("enableNotifications")}
              </Label>
              <Switch
                id="enable-notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-app-red-light dark:data-[state=checked]:bg-app-yellow-DEFAULT"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("youCanAddNotificationSettingsHere")}</p>
          </div>
          {renderBottomNav()}
        </div>
      )}
      {currentScreen === "donation" && (
        <div className="min-h-screen bg-white max-w-sm mx-auto pb-20 dark:bg-black dark:text-white">
          {renderHeader("Donation")}

          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold mb-2 dark:text-white">{t("totalDonated")}</h2>
              <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">{t("donationGoal")}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-700">
                <div
                  className="bg-app-red-light h-2.5 rounded-full dark:bg-app-yellow-DEFAULT"
                  style={{ width: `${donationProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>$ {totalRaised} ETB</span>
                <span>$ {donationGoal} ETB</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="donation-amount">{t("enterAmount")}</Label>
                <Input
                  id="donation-amount"
                  type="number"
                  placeholder="e.g., 500"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="account-number">{t("accountNumber")}</Label>
                <Input
                  id="account-number"
                  type="text"
                  placeholder="e.g., 1234567890"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="bank-options">{t("selectBank")}</Label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectValue placeholder={t("bankOptions")} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <SelectItem value="CBE">{t("cbe")}</SelectItem>
                    <SelectItem value="Abyssinia">{t("abyssinia")}</SelectItem>
                    <SelectItem value="Telebirr">{t("telebirr")}</SelectItem>
                    <SelectItem value="Dashen">{t("dashen")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleDonationSubmit}
                className="w-full bg-app-red-light hover:bg-red-900 dark:bg-app-yellow-DEFAULT dark:text-app-red-DEFAULT dark:hover:bg-app-yellow-DEFAULT/90"
              >
                {t("submit")}
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-3 dark:text-white">{t("donationHistory")}</h3>
              <div className="space-y-2">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200 dark:bg-gray-800 dark:border-app-yellow-DEFAULT"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-app-yellow-DEFAULT" />
                      <div>
                        <p className="text-sm font-medium dark:text-white">$ {donation.amount}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {t(donation.method.toLowerCase().replace(/\s/g, "")) || donation.method}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300">{t(donation.status)}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t(donation.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {renderBottomNav()}
        </div>
      )}
    </>
  )
}
