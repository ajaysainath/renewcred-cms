interface Props{

title:string;

value:number|string;

}

export default function StatsCard({

title,

value,

}:Props){

return(

<div
className="rounded-3xl bg-white shadow-lg p-6"
>

<p
className="text-gray-500"
>
{title}
</p>

<h2
className="text-4xl mt-3 font-bold text-[#4A0E2E]"
>
{value}
</h2>

</div>

);

}