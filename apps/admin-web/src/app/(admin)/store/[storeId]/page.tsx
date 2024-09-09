"use client";

import { Store, StoreType } from "@repo/ui/types";
import {
  faCircleLeft,
  faCloudUpload,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import { ADMIN_APIS, US_STATES } from "@repo/ui/config";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAxios } from "@/hooks/use-axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storeFormSchema } from "./store-form-schema";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/app/loading";

const createFormData = (store?: Store): z.infer<typeof storeFormSchema> =>
  store
    ? {
        name: store.name,
        description: store.description,
        email: store.email,
        phone: store.phone,
        address: {
          street: store.address?.street,
          city: store.address?.city,
          state: store.address?.state,
          zipCode: store.address?.zipCode.toString(),
        },
        tags: store.tags.join(","),
        type: store.type,
      }
    : {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        tags: "",
        type: "FOOD_TRUCK",
      };

const createStoreData = (formData: z.infer<typeof storeFormSchema>): Store => ({
  name: formData.name,
  description: formData.description,
  email: formData.email,
  phone: formData.phone,
  address: {
    street: formData.address.street,
    city: formData.address.city,
    state: formData.address.state,
    zipCode: Number(formData.address?.zipCode),
  },
  tags: formData.tags.split(","),
  type: formData.type as StoreType,
  imageUrl: "",
});

export default function StoreCreateUpdatePage() {
  const { toast } = useToast();
  const axios = useAxios();
  const { storeId } = useParams<{ storeId: string }>();
  const isNewStore = storeId === "new";

  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    !isNewStore ? `${ADMIN_APIS.STORE.STORE_DETAILS}/${storeId}` : null
  );

  const storeForm = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: createFormData(),
  });

  useEffect(() => {
    if (storeData) {
      storeForm.reset(createFormData(storeData));
    }
  }, [storeData]);

  const onSubmit = (values: z.infer<typeof storeFormSchema>) => {
    const storeData = createStoreData(values);
    const axiosAction = storeData
      ? axios.put(`/store/${storeId}`, storeData)
      : axios.post("/store", storeData);
    axiosAction.then(
      () => {
        toast({
          title: "Success!",
          duration: 5000,
          description: `Store ${storeData ? "updated" : "created"} successfully.`,
        });
        if (isNewStore) {
          storeForm.reset(createFormData());
        }
      },
      () => {
        toast({
          variant: "destructive",
          duration: 5000,
          title: "Failure!",
          description: `Store ${storeData ? "update" : "creation"} failed.`,
        });
      }
    );
  };

  return (
    <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-2xl font-semibold">Add Store</h4>
          <div className="text-sm text-slate-500">
            Please provide details for the new Store
          </div>
        </div>
        <div>
          <Link
            href={"/store/list"}
            className="px-3 py-2 text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
          >
            <FontAwesomeIcon icon={faCircleLeft} />
            <span className="pl-2">Go Back</span>
          </Link>
        </div>
      </div>

      <hr className="mt-6 border-slate-200" />
      <div className="pt-3">
        {isStoreDataLoading || storeForm.formState.isSubmitting ? (
          <Loading />
        ) : (
          <Form {...storeForm}>
            <form
              onSubmit={storeForm.handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <FormField
                control={storeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact email"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a store type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(StoreType).map(([key, value]) => (
                          <SelectItem value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Tags*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter store tags" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter comma separated tags
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(US_STATES).map(([key, value]) => (
                          <SelectItem value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter store description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Max 1000 chars</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-5">
                <Button
                  type="button"
                  onClick={() => storeForm.reset()}
                  className="bg-white text-gray-800 border border-gray-800 mr-3 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                  <span className="pl-2">Reset</span>
                </Button>
                <Button
                  type="submit"
                  disabled={storeForm.formState.isSubmitting}
                >
                  <FontAwesomeIcon icon={faCloudUpload} />
                  <span className="pl-2">Save Store</span>
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
