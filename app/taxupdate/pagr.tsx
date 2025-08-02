import { ITaxUpdate } from '@/models/taxupdate';

async function getTaxUpdate() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/api/taxupdate`, {
    cache: 'no-store', 
  });

  if (!res.ok) {

    throw new Error('Failed to fetch tax update');
  }
  
  const data = await res.json();
  return data.taxUpdate;
}


export default async function UserTaxUpdatePage() {
  const taxUpdate: ITaxUpdate | null = await getTaxUpdate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tax Information Update</h1>
      <div className="p-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800">
        <h2 className="font-bold mb-2">Latest Update:</h2>
        {taxUpdate ? (
          <p>{taxUpdate.message}</p>
        ) : (
          <p>No tax updates at this moment.</p>
        )}
      </div>
    </div>
  );
}