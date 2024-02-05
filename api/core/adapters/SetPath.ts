import User from '../domain/User'

export type AddressOBject = {
    [key: string]: string[]
}

type FabricAlgo = (users: User[]) => {
    distance(point1: Array<string>, point2: Array<string>): number
    calculateDistance(): number
    handler(): {
        calculateDistance: () => number
        orderVisitUsr: User[]
    }
}

export default function PathFabric(users: User[]) {
    const address = users.reduce(
        (result, user) => {
            if (user.id) result[user.id] = user.address
            return result
        },
        { start: ['0', '0'] } as AddressOBject
    )

    // Start with initial path
    const path = ['start']

    // Function to calculate distance between two points
    function distance(point1: Array<string>, point2: Array<string>) {
        const dx = Number(point1[0]) - Number(point2[0])
        const dy = Number(point1[1]) - Number(point2[1])
        return Math.sqrt(dx * dx + dy * dy)
    }

    function calculateDistance() {
        let totalDistance = 0
        for (let i = 0; i < path.length - 1; i++) {
            const current = path[i]
            const next = path[i + 1]
            totalDistance += distance(address[current], address[next])
        }
        return totalDistance
    }

    function handler() {
        const locations = address
        const locationsTotal = Object.keys(locations).length
        const orderVisitUsr: User[] = []

        let currentLocation = 'start'

        while (path.length < locationsTotal) {
            let nearestNeighbor: string | null = null
            let minDistance = Number.POSITIVE_INFINITY

            // Find next
            for (let key in locations) {
                const nextLocation = key

                if (!path.includes(nextLocation)) {
                    const d = distance(
                        address[currentLocation],
                        address[nextLocation]
                    )

                    if (d < minDistance) {
                        minDistance = d
                        nearestNeighbor = nextLocation
                    }
                }
            }

            // Add nearest

            if (nearestNeighbor) {
                const nextUser = users.filter(
                    (usr: any) => usr.id === Number(nearestNeighbor)
                )
                orderVisitUsr.push(nextUser[0])
            }

            if (nearestNeighbor) path.push(nearestNeighbor)
            if (nearestNeighbor) currentLocation = nearestNeighbor
        }

        // Add return to starting point
        path.push('start')

        return {
            calculateDistance,
            orderVisitUsr,
        }
    }

    return handler()
}
