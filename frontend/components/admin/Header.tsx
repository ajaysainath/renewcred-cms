export default function Header() {

return(

<header
className="flex justify-between items-center mb-10"
>

<div>

<h1
className="text-4xl font-heading italic text-[#4A0E2E]"
>
Dashboard
</h1>

<p
className="text-gray-500 mt-2"
>
Manage RenewCred Standards
</p>

</div>

<div
className="flex items-center gap-4"
>

<div
className="h-12 w-12 rounded-full bg-[#4A0E2E] text-white flex items-center justify-center font-bold"
>
A
</div>

</div>

</header>

);

}