import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experience/consistech')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/experience/consistech"!</div>
}
