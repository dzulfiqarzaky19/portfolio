import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experience/mandiri')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/experience/mandiri"!</div>
}
