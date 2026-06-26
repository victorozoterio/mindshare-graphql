import { Page } from "@/components/Page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateIdeaDialog } from "./Ideas/components/CreateIdeaDialog"

export function Ideas() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-3xl font-medium text-purple-600">Ideais</Label>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova ideia
          </Button>
        </div>
      </div>

      <CreateIdeaDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Page>
  )
}