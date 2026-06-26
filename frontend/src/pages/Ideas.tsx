import { Page } from "@/components/Page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateIdeaDialog } from "./Ideas/components/CreateIdeaDialog"
import { useQuery } from "@apollo/client/react"
import type { Idea } from "@/types"
import { LIST_IDEAS } from "@/lib/graphql/queries/Idea"
import { IdeaCard } from "./Ideas/components/IdeaCard"
import { IdeaDetailDrawer } from "./Ideas/components/IdeaDetailDrawer"

export function Ideas() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data } = useQuery<{ listIdeas: Idea[] }>(LIST_IDEAS)
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null)

  const ideas = data?.listIdeas || []

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId)
    setOpenDrawer(true)
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-3xl font-medium text-purple-600">Ideias</Label>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova ideia
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => handleIdeaClick(idea.id)}
          />
        ))}
      </div>
      <IdeaDetailDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        ideaId={selectedIdeaId}
      />

      <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Page>
  )
}