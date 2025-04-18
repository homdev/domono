'use client'

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Définir le type ServiceType directement ici pour résoudre le problème d'importation
export type ServiceType = 'domotique' | 'alarme' | 'videoSurveillance' | 'controleAcces';

// Schéma de base pour tous les services
const baseSchema = z.object({
  budget: z.string().min(1, { message: 'Veuillez indiquer votre budget' }),
  timeframe: z.enum(['immédiat', '1-3mois', '3-6mois', '6mois+'], {
    required_error: 'Veuillez sélectionner un délai',
  }),
  additionalInfo: z.string().optional(),
});

// Schéma spécifique pour la domotique
const domotiqueSchema = baseSchema.extend({
  roomCount: z.string().min(1, { message: 'Veuillez indiquer le nombre de pièces' }),
  smartDevices: z.array(z.string()).optional(),
  isRenovation: z.boolean().optional(),
});

// Schéma spécifique pour l'alarme
const alarmeSchema = baseSchema.extend({
  propertySize: z.string().min(1, { message: 'Veuillez indiquer la superficie' }),
  entranceCount: z.string().min(1, { message: 'Veuillez indiquer le nombre d\'entrées' }),
  isConnectedAlarm: z.boolean().optional(),
  hasExistingSystem: z.boolean().optional(),
});

// Schéma spécifique pour la vidéosurveillance
const videoSchema = baseSchema.extend({
  cameraCount: z.string().min(1, { message: 'Veuillez indiquer le nombre de caméras souhaité' }),
  isOutdoor: z.boolean().optional(),
  isIndoor: z.boolean().optional(),
  hasRemoteAccess: z.boolean().optional(),
});

// Schéma spécifique pour le contrôle d'accès
const controleSchema = baseSchema.extend({
  accessPointCount: z.string().min(1, { message: 'Veuillez indiquer le nombre de points d\'accès' }),
  accessType: z.enum(['badge', 'code', 'biométrique', 'smartphone'], {
    required_error: 'Veuillez sélectionner un type d\'accès',
  }),
  userCount: z.string().min(1, { message: 'Veuillez indiquer le nombre d\'utilisateurs' }),
});

// Définir des types distincts pour chaque service
type DomotiqueValues = z.infer<typeof domotiqueSchema>;
type AlarmeValues = z.infer<typeof alarmeSchema>;
type VideoValues = z.infer<typeof videoSchema>;
type ControleValues = z.infer<typeof controleSchema>;

// Type union pour tous les types de formulaires
type FormValues = DomotiqueValues | AlarmeValues | VideoValues | ControleValues;

interface ProjectDetailsProps {
  serviceType: ServiceType;
  onSubmit: (data: FormValues) => void;
}

export function ProjectDetails({ serviceType, onSubmit }: ProjectDetailsProps) {
  // Sélection du schéma selon le service
  const getSchema = () => {
    switch (serviceType) {
      case 'domotique':
        return domotiqueSchema;
      case 'alarme':
        return alarmeSchema;
      case 'videoSurveillance':
        return videoSchema;
      case 'controleAcces':
        return controleSchema;
      default:
        return baseSchema;
    }
  };

  // Utiliser any comme solution temporaire pour les problèmes de typage
  // On pourrait améliorer ceci avec un typage conditionnel plus précis dans un refactoring
  const form = useForm<any>({
    resolver: zodResolver(getSchema()) as any,
    defaultValues: {
      budget: '',
      timeframe: 'immédiat',
      additionalInfo: '',
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Rendu conditionnel des champs spécifiques au service
  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case 'domotique':
        return (
          <>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="roomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de pièces à équiper</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="isRenovation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Projet de rénovation</FormLabel>
                      <FormDescription>
                        S'agit-il d'une rénovation ou d'un logement neuf ?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="smart-devices">
                  <AccordionTrigger>Équipements souhaités</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="smartDevices"
                        render={() => (
                          <FormItem>
                            {['Éclairage', 'Chauffage', 'Volets', 'Audio/Vidéo', 'Sécurité'].map((device) => (
                              <FormField
                                key={device}
                                control={form.control}
                                name="smartDevices"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={device}
                                      className="flex flex-row items-start space-x-3 space-y-0 py-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(device)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), device])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) => value !== device
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {device}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </>
        );
      case 'alarme':
        return (
          <>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="propertySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Superficie du logement (m²)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="entranceCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre d'entrées/portes</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="isConnectedAlarm"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Alarme connectée</FormLabel>
                        <FormDescription>
                          Souhaitez-vous une alarme pilotable à distance ?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="hasExistingSystem"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Système existant</FormLabel>
                        <FormDescription>
                          Possédez-vous déjà un système d'alarme ?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
          </>
        );
      case 'videoSurveillance':
        return (
          <>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="cameraCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de caméras souhaitées</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="isOutdoor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Extérieur</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="isIndoor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Intérieur</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="hasRemoteAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accès à distance</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
          </>
        );
      case 'controleAcces':
        return (
          <>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="accessPointCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de points d'accès</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="accessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'accès préféré</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type d'accès" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="badge">Badge/carte</SelectItem>
                        <SelectItem value="code">Code numérique</SelectItem>
                        <SelectItem value="biométrique">Biométrique</SelectItem>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="userCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre d'utilisateurs</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </>
        );
      default:
        return null;
    }
  };

  // Titre dynamique selon le service
  const getServiceTitle = () => {
    switch (serviceType) {
      case 'domotique':
        return 'Projet Domotique';
      case 'alarme':
        return 'Système d\'Alarme';
      case 'videoSurveillance':
        return 'Vidéosurveillance';
      case 'controleAcces':
        return 'Contrôle d\'Accès';
      default:
        return 'Détails du Projet';
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (data: any) => {
    onSubmit(data as FormValues);
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{getServiceTitle()}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Champs spécifiques au service */}
          {renderServiceSpecificFields()}

          {/* Champs communs à tous les services */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget estimé (€)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="timeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Délai du projet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un délai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="immédiat">Immédiat</SelectItem>
                      <SelectItem value="1-3mois">1 à 3 mois</SelectItem>
                      <SelectItem value="3-6mois">3 à 6 mois</SelectItem>
                      <SelectItem value="6mois+">Plus de 6 mois</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations complémentaires</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Précisions sur votre projet..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-end pt-4"
          >
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Continuer
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
} 