

import { FormEditElement } from "@components/Shared/FormEditElement";
import { db } from "@lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type ElementPageProps = {
    params: {
        elementId: string,
    }
}

const ElementPage = async ({ params: { elementId }, }: ElementPageProps) => {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return redirect("/")
    }

    const element = await db.element.findUnique({
        where: {
            id: elementId
        }
    });

    if (!element) {
        redirect("/")
    }

    return (
        <div>
            <h1>Element Page</h1>
            <div>
                <FormEditElement dataElement={element} />
            </div>
        </div>
    )
};

export default ElementPage;