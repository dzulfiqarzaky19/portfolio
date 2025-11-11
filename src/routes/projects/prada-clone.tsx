import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/prada-clone')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/prada-clone"!</div>
}
