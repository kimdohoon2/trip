import { handleTourApiRequest} from '@/app/utils/tourApiHandler';

export async function GET(req: Request) {
  return handleTourApiRequest(req, {
    endpoint: 'locationBasedList2',
    requiredParams: ['mapX', 'mapY', 'radius'],
  });
}