import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/web-novel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/web-novel"!</div>
}
