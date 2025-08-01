import BuyResidentialsPage from "@/template/BuyResidentialsPage";

async function BuyResidentials({ searchParams }) {
  
  const res = await fetch(`${process.env.BASE_URL}/api/profile`, {
    cache: "no-store",
  });
  const contentType = res.headers.get("content-type");
  let data = null;

  try{
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
    } else {
      const text = await res.text();
      console.error("پاسخ JSON نبود:", text);
       return <h3>مشکلی پیش آمده است</h3>;
    }
  } catch (error) {
    console.error("خطا در JSON()", error);
    return <h3>مشکلی پیش آمده است(parse JSON failed)</h3>;
  }
  

  if (data?.error) return <h3>مشکلی پیش آمده است</h3>;

  let finalData = data.data;
  if (searchParams.category) {
    finalData = finalData.filter((i) => i.category === searchParams.category);
  }

  return <BuyResidentialsPage data={finalData} />;
}

export default BuyResidentials;
